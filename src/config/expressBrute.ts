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
  nextValidRequestDate: any,
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

// Start slowing requests after 5 failed attempts to do something for the
// same user
const bruteForceOptions: ExpressBruteOptions = {
  freeRetries: 5,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback,
  handleStoreError,
};

export default {
  store,
  bruteForceOptions,
};
