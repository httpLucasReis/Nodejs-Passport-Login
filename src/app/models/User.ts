import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

import UserInterface from '../../contracts/UserInterface';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
      maxlength: 255,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
    },
    passwordToken: {
      type: String,
      select: false,
    },
    passwordTokenExpirationDate: {
      type: Date,
      select: false,
    },
  },
  { timestamps: false, versionKey: false }
);

UserSchema.methods.verifyPassword = async function (
  this: UserInterface,
  password: string
): Promise<boolean> {
  const validPassword = await bcryptjs.compare(password, this.password);
  return validPassword;
};

UserSchema.methods.clearPasswordToken = function (
  this: UserInterface
): void {
  this.passwordToken = undefined;
  this.passwordTokenExpirationDate = undefined;
};

export default model<UserInterface>('User', UserSchema);
