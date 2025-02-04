import Joi from 'joi';
import type { Authorisation } from '../repository/user-repository';

export interface IUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  authorization?: Authorisation;
  createdAt?: Date;
  updatedAt?: Date;
  library?: string; //Change that to ILibrary
  friendsList?: string[]; //Then change that to IUser[]
}

export type UpdateUserHttpRequest = Pick<
  IUser,
  'firstName' | 'lastName' | 'email' | 'password' | 'authorization' | 'library' | 'friendsList'
>;
export const UpdateUserSchema = Joi.object({
  firstName: Joi.string().min(2).optional(),
  lastName: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
  authorization: Joi.string().optional(),
  library: Joi.string().optional(),
  friendsList: Joi.array().items(Joi.string()).optional(),
});
