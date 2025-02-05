import type { Request, Response } from 'express';
import { authenticateUserSchema } from '../model/auth-model';
import type { AuthenticateUserHttpRequest, AuthenticateUserHttpResponse } from '../model/auth-model';
import { loginUseCase } from '../use-cases/login-use-case';

const loginController = {
  login: async (req: Request<AuthenticateUserHttpRequest>, res: Response<AuthenticateUserHttpResponse>) => {
    const { error } = authenticateUserSchema.validate(req.body);
    if (error) {
      console.error(error);
    }

    const pendingUser = req.body;

    const authenticatedUser = await loginUseCase(pendingUser);

    return res.json(authenticatedUser);
  },
};

export { loginController };
