import type { Request, Response } from 'express';
import { Router } from 'express';

const authenticationRouter: Router = Router();

authenticationRouter.post('/login', (req: Request, res: Response) => {
  res.json({
    message: 'Successfully created a new user',
  });
});

authenticationRouter.post('/signup', (req: Request, res: Response) => {
  res.json({
    message: 'Successfully signed up',
  });
});

export default authenticationRouter;
