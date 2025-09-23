import request from 'supertest';
import express from 'express';
import cors from 'cors';
import usersRoutes from '../routes/userRoutes';
import { users } from '../data/database';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', usersRoutes);
jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

describe('User API', () => {
  it('should log in an existing user', async () => {
    // Note: This test assumes the user with 'test@example.com' exists in the mock DB.
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });

  it('should return 404 for a non-existent user on login', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'nonexistent@example.com' });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'User not found. Please register.');
  });
});