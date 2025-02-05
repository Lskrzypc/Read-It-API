import { Router } from 'express';
import { registerController } from './controllers/register-controller';
import { loginController } from './controllers/login-controller';

const authenticationRouter: Router = Router();

authenticationRouter.post('/signup', registerController.register);
authenticationRouter.post('/login', loginController.login);

export default authenticationRouter;
