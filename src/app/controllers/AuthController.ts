import { Request, Response } from 'express';

import User from '../models/User';
import UserValidator from '../validators/UserValidator';
import hashPassword from '../../utils/hashPassword';

class LoginController {
  public renderLogin(req: Request, res: Response) {
    return res.render('login');
  }

  public renderRegister(req: Request, res: Response) {
    return res.render('register');
  }

  public async register(req: Request, res: Response) {
    try {
      const {
        username, email, password1, password2,
      } = req.body;

      const userAlreadyExists = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (userAlreadyExists) {
        req.flash(
          'error',
          "There's already an account with that username or email.",
        );
        return res.status(409).render('register');
      }

      const isAnInvalidUsername = !UserValidator.validateUsername(username);
      if (isAnInvalidUsername) {
        req.flash('error', 'Invalid username.');
        return res.status(406).render('register');
      }

      const isAnInvalidEmail = !UserValidator.validateEmailFormat(email);
      if (isAnInvalidEmail) {
        req.flash('error', 'Invalid email format.');
        return res.status(406).render('register');
      }

      const isAnInvalidPassword = !UserValidator.validatePasswords(
        password1,
        password2,
      );
      if (isAnInvalidPassword) {
        req.flash('error', 'Invalid password.');
        return res.status(400).render('register');
      }

      const hashedPassword = await hashPassword(password1);
      await User.create({ username, password: hashedPassword, email });

      req.flash('success', 'Account created successfully.');
      return res.redirect('/login');
    } catch (err) {
      req.flash('error', "Couldn't register your account, try again.");
      return res.render('register');
    }
  }

  public async logout(req: Request, res: Response) {
    req.logOut();
    return res.sendStatus(200);
  }
}

export default new LoginController();
