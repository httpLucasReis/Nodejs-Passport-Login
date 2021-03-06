/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

import UserContract from '@contracts/UserContract';

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
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    passwordToken: {
      type: String,
      select: false,
    },
    passwordTokenExpirationDate: {
      type: Date,
      select: false,
    },
    emailVerificationToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: false, versionKey: false },
);

UserSchema.methods.verifyPassword = async function (
  this: UserContract,
  password: string,
) {
  const validPassword = await bcryptjs.compare(password, this.password);
  return validPassword;
};

UserSchema.methods.clearPasswordToken = async function (
  this: UserContract,
) {
  this.passwordToken = undefined;
  this.passwordTokenExpirationDate = undefined;
  await this.save();
};

UserSchema.methods.setEmailAsVerified = async function (
  this: UserContract,
) {
  this.emailVerificationToken = undefined;
  this.verified = true;
  await this.save();
};

export default model<UserContract>('User', UserSchema);
