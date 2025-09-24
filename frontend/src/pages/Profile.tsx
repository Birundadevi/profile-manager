import React, { useState } from 'react';
import type { UserProfile } from '../App';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Avatar } from '@mui/material';
import ProfileManager from '../components/ProfileManager';

interface ProfilePageProps {
  user: UserProfile;
  onProfileUpdate: (updatedUser: UserProfile) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 22 }}>
          <Card sx={{ p: 3, mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ width: 80, height: 80, mr: 2 }}>
                  {user.name ? user.name.charAt(0) : 'U'}
                </Avatar>
                <Typography variant="h4" component="h1">
                  {isEditing ? 'Edit Profile' : 'User Profile'}
                </Typography>
              </Box>

              {isEditing ? (
                <ProfileManager
                  user={user}
                  onProfileUpdate={(updatedUser) => {
                    onProfileUpdate(updatedUser);
                    setIsEditing(false);
                  }}
                  onCancel={handleCancelClick}
                />
              ) : (
                <Box>
                  <Typography variant="h6">Name:</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>{user.name || 'N/A'}</Typography>

                  <Typography variant="h6">Email:</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>{user.email || 'N/A'}</Typography>

                  <Typography variant="h6">GitHub Username:</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>{user.githubUsername || 'N/A'}</Typography>

                  <Button variant="contained" onClick={handleEditClick}>
                    Edit Profile
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;