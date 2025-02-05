import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../../users/repository/user-repository';
import type { AuthenticateUserHttpRequest, AuthenticateUserHttpResponse } from '../model/auth-model';

const loginUseCase = async (data: AuthenticateUserHttpRequest): Promise<AuthenticateUserHttpResponse> => {
  const authenticationData = data;

  const email = authenticationData.email ?? '';
  const password = authenticationData.password ?? '';

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error('Incorrect password');
  }

  const accessToken = sign({ email: user.email }, process.env.JWT_SECRET ?? '', {
    expiresIn: '1h',
  });

  return { accessToken, _id: user._id };
};

export { loginUseCase };
