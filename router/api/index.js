import { Router } from 'express';
import gitlab from './gitlab.js';

const router = Router();

router.use('/gitlab', gitlab);

export default router;