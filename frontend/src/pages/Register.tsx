import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Box, Typography, CircularProgress, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const API_URL = `${import.meta.env.REACT_APP_BACKEND_BASEURL}/api/users`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed.');
      }

      setMessage(responseData.message);
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                p: 4,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            <Typography variant="h5" component="h1" gutterBottom>
                Register
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
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
                disabled={isLoading || isSuccess}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Register'}
            </Button>

            <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                    Already have an account? Login
                </Typography>
            </Link>
            
            {message && (
                <Typography color={isSuccess ? "primary" : "error"} variant="body2" sx={{ mt: 2 }}>
                    {message}
                </Typography>
            )}
            {isSuccess && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        Redirecting to login...
                    </Typography>
                </Box>
            )}
        </Box>
    </Container>
  );
};

export default Register;