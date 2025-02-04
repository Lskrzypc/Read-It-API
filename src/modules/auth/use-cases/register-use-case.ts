import { hash } from 'bcrypt';
import type { IUser } from '../../users/model/user-model';
import User from '../../users/repository/user-repository';
import type { CreateUserHttpRequest, CreateUserHttpResponse } from '../model/auth-model';

function toFormattedName(name: string) {
  name = name.toLowerCase();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function toFormattedEmail(email: string) {
  return email.toLowerCase();
}

function toHashedPassword(password: string) {
  const saltRounds = 10;
  return hash(password, saltRounds);
}

const registerUseCase = async (data: CreateUserHttpRequest): Promise<CreateUserHttpResponse> => {
  const userData = data;

  userData.lastName = toFormattedName(userData.lastName ?? ''); // In fact, never null as controller validates it
  userData.firstName = toFormattedName(userData.firstName ?? '');
  userData.email = toFormattedEmail(userData.email ?? '');
  userData.password = await toHashedPassword(userData.password ?? '');

  const pendingUser = await User.create(userData);

  await pendingUser.save();

  return pendingUser as IUser;
};

export { registerUseCase };
