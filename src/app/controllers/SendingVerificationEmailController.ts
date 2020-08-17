import { Response } from 'express';

import TokenRequest from '@contracts/TokenRequest';
import User from '@models/User';
import generateToken from '@utils/generateToken';
import Mail from '@services/Mail';

class SendingVerificationEmailController {
  public async index(req: TokenRequest, res: Response) {
    try {
      const { email } = req.query;

      if (!email) {
        throw new Error('No email provided.');
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found.');
      }

      if (user.verified) {
        throw new Error('Account already verified.');
      }

      const emailVerificationToken = generateToken();
      user.emailVerificationToken = emailVerificationToken;
      await user.save();

      const mail = new Mail();
      const emailVerificationUrl = `http://${process.env.HOST}:${process.env.PORT}/verifyEmail?token=${emailVerificationToken}&email=${email}`;
      const emailContent = `<a href="${emailVerificationUrl}">Click here</a> to confirm your account.`;
      await mail.send(email, emailContent);

      return res.render('send_verification_email', { email });
    } catch (err) {
      req.flash('error', 'Could not send a confirmation email.');
      return res.redirect('/login');
    }
  }
}

export default new SendingVerificationEmailController();
