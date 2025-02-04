import mongoose, { Schema } from 'mongoose';

export type Authorisation = 'admin' | 'user+' | 'user';

export interface IUserRepository {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  authorization: Authorisation;
  createdAt: Date;
  updatedAt: Date;
  library: mongoose.Types.ObjectId | ''; //Change that to ILibrary['id']
  friendsList: mongoose.Types.ObjectId[] | ['']; //Then change that to IUser['id'][]
}

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  authorization: { type: String, required: false, default: 'user', enum: ['admin', 'user+', 'user'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  library: { type: Schema.Types.ObjectId, ref: 'Library' },
  friendsList: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model<IUserRepository>('User', userSchema);

export default User;
