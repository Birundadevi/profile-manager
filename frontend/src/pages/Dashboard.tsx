// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import type { UserProfile } from '../App';
import GitHubRepos from '../components/GitHubRepos';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

interface DashboardProps {
    user: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    // State to hold the value of the input field
    const [localGithubUsername, setLocalGithubUsername] = useState<string>('');
    // State to hold the username used for fetching repos
    const [displayUsername, setDisplayUsername] = useState<string | null>(null);

    // Set the initial value from the user's profile
    useEffect(() => {
        if (user.githubUsername) {
            setLocalGithubUsername(user.githubUsername);
            setDisplayUsername(user.githubUsername);
        }
    }, [user.githubUsername]);

    const handleFetchRepos = () => {
        setDisplayUsername(localGithubUsername.trim());
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleFetchRepos();
        }
    };

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
            <Box
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
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Welcome to your dashboard, {user.name || 'User'}!
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Enter a GitHub username to view their public repositories.
                </Typography>
                
                <Box sx={{ mb: 4, display: 'flex', gap: 2, width: '100%', maxWidth: '400px' }}>
                    <TextField
                        fullWidth
                        label="GitHub Username"
                        value={localGithubUsername}
                        onChange={(e) => setLocalGithubUsername(e.target.value)}
                        onKeyDown={handleKeyPress}
                        size="small"
                    />
                    <Button
                        variant="contained"
                        onClick={handleFetchRepos}
                    >
                        Fetch
                    </Button>
                </Box>
                
                {displayUsername ? (
                    <GitHubRepos username={displayUsername} />
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Please enter a GitHub username to get started.
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Dashboard;