// backend/src/routes/githubRoutes.ts
import { Router } from 'express';
import { getRepos } from '../controllers/githubController';

const router = Router();

// GET /api/github/repos/:username
router.get('/repos/:username', getRepos);

export default router;