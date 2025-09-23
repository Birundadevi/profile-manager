import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import githubRoutes from './routes/githubRoutes'; // Import the new route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Define a whitelist for allowed origins
// const whitelist = [
//   'http://localhost:5173', // For local development
//   'https://profile-management-ruddy.vercel.app' // For Vercel production
// ];

const corsOptions = {
  origin: 'https://profile-management-ruddy.vercel.app', // Replace with your actual domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // This allows cookies and authorization headers to be sent
};


// Use the cors middleware with the defined options
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON bodies

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