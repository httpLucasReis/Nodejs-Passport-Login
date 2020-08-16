import ExpressBrute, { Options as ExpressBruteOptions } from 'express-brute';
import MemCached from 'express-brute-memcached';
import { Request, Response } from 'express';
import moment from 'moment';
import { MemoryStore } from 'express-session';

let store: MemoryStore | MemCached;

if (process.env.NODE_ENV === 'development') {
  store = new ExpressBrute.MemoryStore();
} else {
  store = new MemCached([process.env.HOST]);
}

const failCallback = (
  req: Request,
  res: Response,
  next: Function,
  nextValidRequestDate: Date,
) => {
  req.flash(
    'error',
    `You've made too many failed attempts in a short period of time, please try again ${moment(nextValidRequestDate).fromNow()}`,
  );
  return res.redirect('/login');
};

const handleStoreError = (error: Error) => ({
  message: error.message,
});

const fiveMinutes = 5 * 60 * 1000;
const oneHour = 60 * 60 * 1000;
const bruteForceOptions: ExpressBruteOptions = {
  freeRetries: 5,
  minWait: fiveMinutes,
  maxWait: oneHour,
  failCallback,
  handleStoreError,
};

export default {
  store,
  bruteForceOptions,
};
