// backend/src/controllers/userController.ts
import { Request, Response } from 'express';
// import { db } from '../db/inMemoryDb';
import { users } from '../data/database'; // Import from the new data file
import { UserProfile } from '../types';
import { z } from 'zod';

// Define Zod schemas for our request bodies
const loginSchema = z.object({
  email: z.string().email(),
});

const updateProfileSchema = z.object({
    name: z.string().optional(),
    githubUsername: z.string().optional(),
}).refine(data => {
    // Ensure at least one field is provided
    return !!data.name || !!data.githubUsername;
}, {
    message: 'Name or GitHub username must be provided.',
});

// This is our simulated "login" controller.
export const login = (req: Request, res: Response) => {
  try {
    // Validate the request body using Zod
    const { email } = loginSchema.parse(req.body);
    const user = users.find(u => u.email === email);

    if (!user) {
      const newUser: UserProfile = {
        id: `user${Date.now()}`,
        email,
        name: 'New User',
      };
      users.push(newUser);
      return res.status(201).json({ message: 'User created and logged in successfully', user: newUser });
    }

    res.status(200).json({ message: 'Logged in successfully', user });
  } catch (error) {
    // If validation fails, return a 400 error with the validation message
    if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.issues[0].message });
    }
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};

// This controller fetches a user's profile. (No change here)
export const getProfile = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

// This controller updates a user's profile.
export const updateProfile = (req: Request, res: Response) => {
  const { id } = req.params;

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    // Validate and parse the request body using Zod
    const { name, githubUsername } = updateProfileSchema.parse(req.body);

    const user = users[userIndex];
    user.name = name ?? user.name;
    user.githubUsername = githubUsername ?? user.githubUsername;

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.issues[0].message });
    }
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};