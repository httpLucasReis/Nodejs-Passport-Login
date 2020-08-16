import { Request } from 'express';

interface PasswordRecoveryRequest extends Request {
  query: {
    token?: string;
    email?: string;
  }
}

export default PasswordRecoveryRequest;
