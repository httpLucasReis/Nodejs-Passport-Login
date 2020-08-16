import { Response, NextFunction, Request } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  // reset the failure counter so next time they log in they get 5 tries again
  // before the delays kick in
  if (req.brute && req.brute.reset) {
    req.brute.reset(() => res.redirect('/'));
  }
};
