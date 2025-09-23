import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import githubRoutes from './routes/githubRoutes'; // Import the new route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Define a whitelist for allowed origins
const whitelist = [
  'http://localhost:5173', // For local development
  ''+process.env.REACT_APPLICATION_URL // For Vercel production
];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (error: Error | null, success: boolean) => void) {
    // Allow requests if the origin is in the whitelist or if it's a local request with no origin
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  }
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