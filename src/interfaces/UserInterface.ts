import { Document, Types } from 'mongoose';

interface UserInterface extends Document {
  id: Types.ObjectId;
  username: string;
  password: string;
  verifyPassword(password: string): boolean;
  email: string;
}

export default UserInterface;
