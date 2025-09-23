// src/components/GitHubRepos.tsx
import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
    Box,
    Grid,
    Pagination,
} from '@mui/material';

interface GitHubReposProps {
    username: string;
}

interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
}

// In-memory cache for repository data
const repoCache: { [key: string]: GitHubRepo[] } = {};

const GitHubRepos: React.FC<GitHubReposProps> = ({ username }) => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const perPage = 10; // Number of repos per page

    useEffect(() => {
        const fetchRepos = async () => {
            setLoading(true);
            setError(null);

            const cacheKey = `${username}-${page}`;

            // Check if data is in cache
            if (repoCache[cacheKey]) {
                setRepos(repoCache[cacheKey]);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`
                );

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`User '${username}' not found.`);
                    }
                    if (response.status === 403) {
                        throw new Error("GitHub API rate limit exceeded. Please try again later.");
                    }
                    throw new Error('Failed to fetch repositories.');
                }

                const data: GitHubRepo[] = await response.json();
                
                // Cache the fetched data
                repoCache[cacheKey] = data;
                setRepos(data);

                // For a real-world scenario, we'd get total pages from a header link.
                // For simplicity, we'll assume a max of 100 repos (10 pages of 10).
                const totalCount = parseInt(response.headers.get('x-total-count') || '100');
                setTotalPages(Math.ceil(totalCount / perPage));

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchRepos();
        }

    }, [username, page]); // Re-run effect when username or page changes

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }
    
    if (repos.length === 0) {
      return <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>No public repositories found for this user.</Typography>;
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                {repos.map((repo) => (
                    <Grid size={{xs:12,sm:6,md:4}} key={repo.id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        {repo.name}
                                    </a>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {repo.description || 'No description provided.'}
                                </Typography>
                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        ⭐ {repo.stargazers_count}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        🍴 {repo.forks_count}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default GitHubRepos;