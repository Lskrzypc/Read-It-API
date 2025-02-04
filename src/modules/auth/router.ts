import { Router } from 'express';
import { registerController } from './controllers/register-controller';

const authenticationRouter: Router = Router();

authenticationRouter.post('/signup', registerController.register);

export default authenticationRouter;
