import type { Request, Response } from 'express';
import { Router } from 'express';

const userRouter: Router = Router();

userRouter.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'List of users',
  });
});

userRouter.get('/:id', (req: Request, res: Response) => {
  res.json({
    message: `User with id ${req.params.id}`,
  });
});

// Will be implemented in the authentication module
// userRouter.post('/', (req: Request, res: Response) => {
//   res.json({
//     message: 'User created',
//   });
// });

userRouter.put('/:id', (req: Request, res: Response) => {
  res.json({
    message: `User with id ${req.params.id} updated`,
  });
});

userRouter.delete('/:id', (req: Request, res: Response) => {
  res.json({
    message: `User with id ${req.params.id} deleted`,
  });
});

export default userRouter;
