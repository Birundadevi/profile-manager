import React from 'react';
import type { UserProfile } from '../App';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';

// Define the validation schema using Zod
const profileSchema = z.object({
  name: z.string().optional(),
  githubUsername: z.string().optional(),
}).refine(data => {
    return !!data.name || !!data.githubUsername;
}, {
    message: 'Please provide a name or a GitHub username.',
    path: ['githubUsername'],
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

interface ProfileManagerProps {
  user: UserProfile;
  onProfileUpdate: (updatedUser: UserProfile) => void;
  onCancel: () => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ user, onProfileUpdate, onCancel }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const API_URL = `http://localhost:5000/api/users`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || '',
      githubUsername: user.githubUsername || '',
    },
  });

  const onSubmit = async (data: ProfileFormInputs) => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update profile.');
      }

      onProfileUpdate(responseData.user);
      setMessage('Profile updated successfully!');
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        margin="normal"
        fullWidth
        label="Full Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        margin="normal"
        fullWidth
        label="GitHub Username"
        {...register('githubUsername')}
        error={!!errors.githubUsername}
        helperText={errors.githubUsername?.message}
      />
      
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
        <Button 
          variant="outlined" 
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>

      {message && (
          <Typography color="primary" variant="body2" sx={{ mt: 2 }}>
              {message}
          </Typography>
      )}
      {errors.githubUsername && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {errors.githubUsername.message}
        </Typography>
      )}
    </Box>
  );
};

export default ProfileManager;