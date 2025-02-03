import type { Request, Response } from 'express';
import { Router } from 'express';
import userRouter from './modules/users/router';
import authenticationRouter from './modules/auth/router';

const router: Router = Router();

router.get('/healthcheck', (req: Request, res: Response) => {
  res.json({
    status: 'The server is running properly',
  });
});

router.use('/auth', authenticationRouter);
router.use('/user', userRouter);

export default router;
