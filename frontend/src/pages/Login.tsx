import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UserProfile } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, CircularProgress } from '@mui/material';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

const loginSchema = z.object({
  email: z.string().email('Invalid email format.'),
});

type LoginInputs = z.infer<typeof loginSchema>;

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const API_URL = `${import.meta.env.REACT_APP_BACKEND_BASEURL}/api/users`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInputs) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed.');
      }

      onLogin(responseData.user);
      localStorage.setItem('user-id', responseData.user.id);
      navigate('/profile');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </Box>
        {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
            </Typography>
        )}
        <Link to="/register" style={{ textDecoration: 'none', marginTop: '10px' }}>
          Don't have an account? Register
        </Link>
      </Box>
    </Container>
  );
};

export default Login;