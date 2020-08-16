import { Request, Response, NextFunction } from 'express';

const checkAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
};

const checkNotAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return res.redirect('/private');
  }

  return next();
};

export default {
  checkAuthenticated,
  checkNotAuthenticated,
};
