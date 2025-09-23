// src/routes/users.ts
import { Router, Request, Response } from 'express';
import { users } from '../data/database'; // Import from the new data file
import uuid from 'uuid';
const { v4 } = uuid;

const router = Router();

// Login/Register Route
router.post('/login', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  // Find the user by email
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User not found. Please register.' });
  }

  res.status(200).json({
    message: 'User logged in successfully!',
    user,
  });
});

// Register Route
router.post('/register', (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
  
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists. Please log in.' });
    }
  
    const newUser = { id: v4(), email, name: '', githubUsername: '' };
    users.push(newUser);
  
    res.status(201).json({
      message: 'User registered successfully!',
      user: newUser,
    });
  });

// Get User Profile
router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
});

// Update User Profile
router.put('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, githubUsername } = req.body;

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user properties
    users[userIndex] = {
        ...users[userIndex],
        name: name !== undefined ? name : users[userIndex].name,
        githubUsername: githubUsername !== undefined ? githubUsername : users[userIndex].githubUsername,
    };

    res.status(200).json({
        message: 'Profile updated successfully!',
        user: users[userIndex],
    });
});

export default router;