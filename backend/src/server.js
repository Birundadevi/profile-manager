import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import githubRoutes from './routes/githubRoutes'; // Import the new route
import limiter from './middleware/rateLimiter'; // Import the new limiter

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use the cors middleware with the defined options
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello this is working....");
});

app.use('/api', userRoutes);
// Use our user routes with a base path of /api/users
app.use('/api/users', userRoutes);

// Use our new GitHub routes with a base path of /api/github
app.use('/api/github', githubRoutes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;