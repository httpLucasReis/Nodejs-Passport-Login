import { Request } from 'express';

interface TokenRequest extends Request {
  query: {
    token?: string;
    email?: string;
  }
}

export default TokenRequest;
