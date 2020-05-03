import { Document, Types } from 'mongoose';

interface UserInterface extends Document {
  id: Types.ObjectId;
  username: string;
  password: string;
  verifyPassword(password: string): boolean;
  clearPasswordToken(): void;
  email: string;
  passwordToken?: string | null;
  passwordTokenExpirationDate?: Date | null;
}

export default UserInterface;
