import type { Request, Response } from 'express';
import type { CreateUserHttpRequest, CreateUserHttpResponse } from '../model/auth-model';
import { createUserSchema } from '../model/auth-model';
import { registerUseCase } from '../use-cases/register-use-case';
import type { IErrorMessage } from '../../../core/Errors/errors';
import { badRequestError } from '../../../core/Errors/errors';

const registerController = {
  register: async (req: Request<CreateUserHttpRequest>, res: Response<CreateUserHttpResponse | IErrorMessage>) => {
    try {
      const { error } = createUserSchema.validate(req.body);
      if (error) {
        throw badRequestError(error.message);
      }

      const pendingUser = req.body;

      const createdUser = await registerUseCase(pendingUser);

      return res.json(createdUser);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return res.status(error.code).json(error.toJSON());
    }
  },
};

export { registerController };
