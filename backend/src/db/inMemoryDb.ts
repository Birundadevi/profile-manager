import { UserProfile } from '../types';

// A simple in-memory store to simulate a database.
// In a real application, you'd use a proper database like PostgreSQL or MongoDB.
export const db = {
  users: [
    {
      id: 'user123',
      email: 'testuser@example.com',
      name: 'Test User',
      githubUsername: 'Birundadevi'
    },
  ] as UserProfile[],
};