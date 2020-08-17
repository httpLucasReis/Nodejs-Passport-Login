import { Router } from 'express';
import passport from 'passport';

import AuthController from '@controllers/AuthController';
import PasswordRecoveryController from '@controllers/PasswordRecoveryController';

import checkAuthentication from '@middlewares/checkAuthentication';
import bruteForce from '@middlewares/bruteForce';
import resetBruteForce from '@middlewares/resetBruteForce';

const { checkAuthenticated, checkNotAuthenticated } = checkAuthentication;

const routes = Router();

routes.get('/login', checkNotAuthenticated, AuthController.renderLogin);
routes.post('/login', bruteForce.prevent, passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
}), resetBruteForce);

routes.get('/register', checkNotAuthenticated, AuthController.renderRegister);
routes.post(
  '/register',
  bruteForce.prevent,
  checkNotAuthenticated,
  AuthController.register,
);

routes.delete('/logout', checkAuthenticated, AuthController.logout);

routes.get('/private', checkAuthenticated, (req, res) => res.render('private', { user: req.user }));

routes.get(
  '/forgotPassword',
  checkNotAuthenticated,
  PasswordRecoveryController.renderForgotPassword,
);
routes.post(
  '/forgotPassword',
  checkNotAuthenticated,
  PasswordRecoveryController.forgotPassword,
);

routes.get(
  '/resetPassword',
  checkNotAuthenticated,
  PasswordRecoveryController.renderResetPassword,
);
routes.post(
  '/resetPassword',
  checkNotAuthenticated,
  PasswordRecoveryController.resetPassword,
);

export default routes;
