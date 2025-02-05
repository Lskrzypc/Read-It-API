import type { Request, Response } from 'express';
import type { CreateUserHttpRequest, CreateUserHttpResponse } from '../model/auth-model';
import { createUserSchema } from '../model/auth-model';
import { registerUseCase } from '../use-cases/register-use-case';

const registerController = {
  register: async (req: Request<CreateUserHttpRequest>, res: Response<CreateUserHttpResponse>) => {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      console.error(error);
    }

    const pendingUser = req.body;

    const createdUser = await registerUseCase(pendingUser);

    return res.json(createdUser);
  },
};

export { registerController };
