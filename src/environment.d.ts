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
    }
  }
}
