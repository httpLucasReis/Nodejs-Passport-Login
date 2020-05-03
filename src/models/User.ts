import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

import UserInterface from '../interfaces/UserInterface';

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
  },
  { timestamps: false, versionKey: false }
);

UserSchema.pre('save', async function (this: UserInterface, next: any) {
  const hashedPassword = await bcryptjs.hash(this.password, 10);
  this.password = hashedPassword;

  next();
});

UserSchema.methods.verifyPassword = async function (
  this: UserInterface,
  password: string
): Promise<boolean> {
  const validPassword = await bcryptjs.compare(password, this.password);
  return validPassword;
};

export default model<UserInterface>('User', UserSchema);
