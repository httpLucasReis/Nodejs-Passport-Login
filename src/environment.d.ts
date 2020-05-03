import * as ts from 'typescript';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_KEY: string;
      SESSION_SECRET: string;
      MONGODB_URI: string;
      HOST: string;
      PORT: number;
      NODE_ENV: string;
      MAIL_HOST: string;
      MAIL_PORT: number;
      MAIL_USER: string;
      MAIL_PASSWORD: string;
    }
  }
}
