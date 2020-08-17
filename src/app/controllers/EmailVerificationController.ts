import { Response } from 'express';

import TokenRequest from '@contracts/TokenRequest';
import User from '@models/User';

class EmailVerificationController {
  public async index(req: TokenRequest, res: Response) {
    try {
      const { email, token } = req.query;

      const user = await User.findOne({ email })
        .select('+emailVerificationToken');

      if (!user) {
        req.flash('error', 'There is no user with the provided email.');
        return res.redirect('/login');
      }

      const isAnInvalidEmailVerificationToken = (
        user.emailVerificationToken !== token
      );
      if (isAnInvalidEmailVerificationToken) {
        req.flash('error', 'Invalid token.');
        return res.redirect('/login');
      }

      await user.setEmailAsVerified();

      req.flash('success', 'Your account has been verified.');
      return res.redirect('/login');
    } catch (err) {
      req.flash('error', 'Could not verify your account.');
      return res.redirect('/login');
    }
  }
}

export default new EmailVerificationController();
