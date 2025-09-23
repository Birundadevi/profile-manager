// backend/src/controllers/githubController.ts
import { Request, Response } from 'express';

// This controller fetches public repositories for a given GitHub username.
export const getRepos = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ message: 'GitHub username is required.' });
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Failed to fetch repositories. Please check the username.' });
    }

    const repos = await response.json();
    res.status(200).json(repos);

  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    res.status(500).json({ message: 'An unexpected error occurred while fetching repositories.' });
  }
};