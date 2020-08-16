import { Document, Types } from 'mongoose';

interface UserContract extends Document {
  id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  passwordToken?: string | null;
  passwordTokenExpirationDate?: Date | null;

  verifyPassword(password: string): boolean;
  clearPasswordToken(): void;
}

export default UserContract;
