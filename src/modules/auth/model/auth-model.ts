import Joi from 'joi';
import type { IUser } from '../../users/model/user-model';

export type CreateUserHttpRequest = Pick<IUser, 'firstName' | 'lastName' | 'email' | 'password'>;
export type CreateUserHttpResponse = Partial<IUser>;
export const createUserSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export type AuthenticateUserHttpRequest = Pick<IUser, 'email' | 'password'>;
export type AuthenticateUserHttpResponse = {
  accessToken: string;
  _id: string;
};
export const authenticateUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
