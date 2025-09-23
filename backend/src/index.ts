// backend/index.ts
import express from 'express';
import cors from 'cors';
import routes from './routes/userRoutes';
import limiter from './middleware/rateLimiter'; // Import the new limiter


const app = express();
const PORT = process.env.PORT || 5000;

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  githubUsername?: string;
}

app.use(cors());
app.use(express.json());
// Apply the rate limiter to all requests
app.use(limiter);
app.use('/api', routes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

export default app;