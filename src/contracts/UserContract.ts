import { Document, Types } from 'mongoose';

interface UserContract extends Document {
  id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  verified?: boolean;
  passwordToken?: string | null;
  passwordTokenExpirationDate?: Date | null;
  emailVerificationToken?: string;

  verifyPassword(password: string): boolean;
  clearPasswordToken(): void;
  clearEmailVerificationToken(): void;
}

export default UserContract;
