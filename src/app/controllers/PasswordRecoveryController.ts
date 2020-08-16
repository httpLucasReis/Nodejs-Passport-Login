import { Request, Response } from 'express';
import crypto from 'crypto';
import bcryptjs from 'bcryptjs';

import User from '../models/User';
import Mail from '../../services/Mail';
import UserValidator from '../validators/UserValidator';
import PasswordRecoveryRequest from '../../contracts/PasswordRecoveryRequest';

class PasswordRecoveryController {
  public renderForgotPassword(req: Request, res: Response) {
    return res.render('forgotPassword');
  }

  public async renderResetPassword(req: PasswordRecoveryRequest, res: Response) {
    const { token = null, email = null } = req.query;

    if (!token || !email) {
      return res.redirect('/forgotPassword');
    }

    const user = await User.findOne({ email }).select(
      '+passwordToken +passwordTokenExpirationDate',
    );
    if (!user) {
      req.flash('error', "There's no user with the email provided.");
      return res.redirect('/forgotPassword');
    }

    const invalidToken = user.passwordToken !== token;
    if (invalidToken) {
      req.flash('error', 'Invalid token.');
      return res.redirect('/forgotPassword');
    }

    const today = new Date();
    const passwordTokenExpirationDate = user.passwordTokenExpirationDate ?? 0;
    if (today > passwordTokenExpirationDate) {
      req.flash('error', 'Expired token.');
      return res.redirect('/forgotPassword');
    }

    return res.render('resetPassword', { email });
  }

  public async forgotPassword(req: Request, res: Response) {
    try {
      const { emailAddress } = req.body;

      const user = await User.findOne({ email: emailAddress });
      if (!user) {
        req.flash('error', "There's no user with the provided email.");
        return res.status(406).render('forgotPassword');
      }

      const passwordToken = crypto.randomBytes(16).toString('hex');
      const oneHour = 3600000;
      const passwordTokenExpirationDate = new Date(Date.now() + oneHour);

      await User.findOneAndUpdate(
        { email: emailAddress },
        {
          passwordToken,
          passwordTokenExpirationDate,
        },
      );

      const mail = new Mail();
      const recoveryPasswordUrl = `http://${process.env.HOST}:${process.env.PORT}/resetPassword?token=${passwordToken}&email=${emailAddress}`;
      const emailContent = `Access this <a href="${recoveryPasswordUrl}">link</a> to recover your password.`;
      await mail.send(emailAddress, emailContent);

      req.flash(
        'success',
        'Password recovery email message sent successfully.',
      );
      return res.render('forgotPassword');
    } catch (err) {
      req.flash('error', "Password recovery email message couldn't be sent.");
      return res.status(406).render('forgotPassword');
    }
  }

  public async resetPassword(req: Request, res: Response) {
    try {
      const { email, password1, password2 } = req.body;

      const invalidPasswords = await UserValidator.validatePasswords(
        password1,
        password2,
      );
      if (invalidPasswords) {
        req.flash('error', 'Invalid passwords, try again.');
        return res.redirect(req.url);
      }

      const hashedPassword = await bcryptjs.hash(password1, 10);

      const user = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword },
      ).select('+passwordToken +passwordTokenExpirationDate');
      user?.clearPasswordToken();

      await user?.save();

      req.flash('success', 'Password updated successfully');
      return res.redirect('/login');
    } catch (err) {
      req.flash('error', "Coudln't reset the password, try again.");
      return res.status(406).render('resetPassword');
    }
  }
}

export default new PasswordRecoveryController();
