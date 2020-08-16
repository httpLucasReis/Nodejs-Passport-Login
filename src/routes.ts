import { Router } from 'express';
import passport from 'passport';

import AuthController from './app/controllers/AuthController';
import PasswordRecoveryController from './app/controllers/PasswordRecoveryController';

import checkAuthentication from './app/middlewares/checkAuthentication';
import bruteForce from './app/middlewares/bruteForce';
import resetBruteForce from './app/middlewares/resetBruteForce';

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
