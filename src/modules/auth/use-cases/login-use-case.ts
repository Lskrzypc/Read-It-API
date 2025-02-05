import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../../users/repository/user-repository';
import type { AuthenticateUserHttpRequest, AuthenticateUserHttpResponse } from '../model/auth-model';

const loginUseCase = async (data: AuthenticateUserHttpRequest): Promise<AuthenticateUserHttpResponse> => {
  const givenAuthenticationData = data;

  const user = await User.findOne({ email: givenAuthenticationData.email });

  if (!user) {
    throw new Error('User not found');
  }

  const actualUser = {
    _id: user._id,
    email: user.email,
    password: user.password,
  };

  const isPasswordCorrect = await compare(givenAuthenticationData.password ?? '', actualUser.password);

  if (!isPasswordCorrect) {
    throw new Error('Incorrect password');
  }

  const accessToken = sign({ email: actualUser.email }, process.env.JWT_SECRET ?? '', {
    expiresIn: '365d',
  });

  return { accessToken, _id: actualUser._id.toString() };
};

export { loginUseCase };
