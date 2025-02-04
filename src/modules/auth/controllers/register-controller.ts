import type { Request, Response } from 'express';
import type { CreateUserHttpRequest, CreateUserHttpResponse } from '../model/auth-model';
import { createUserSchema } from '../model/auth-model';
import { registerUseCase } from '../use-cases/register-use-case';
import type { IErrorMessage } from '../../../core/errors/errors';
import { badRequestError } from '../../../core/errors/errors';

const registerController = {
  register: async (req: Request<CreateUserHttpRequest>, res: Response<CreateUserHttpResponse | IErrorMessage>) => {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      throw badRequestError(error.message);
    }

    const pendingUser = req.body;

    const createdUser = await registerUseCase(pendingUser);

    return res.json(createdUser);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  },
};

export { registerController };
