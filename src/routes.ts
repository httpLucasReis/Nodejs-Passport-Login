import { Router } from 'express';

// Controllers
import AuthController from './controllers/AuthController';

// Passport configuration
import passport from 'passport';

// Middlewares
import checkAuthentication from './middlewares/checkAuthentication';
import bruteForce from './middlewares/bruteForce';
import resetBruteForce from './middlewares/resetBruteForce';

const { checkAuthenticated, checkNotAuthenticated } = checkAuthentication;

// Routes
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
  AuthController.register
);

routes.delete('/logout', checkAuthenticated, AuthController.logout);

routes.get('/private', checkAuthenticated, (req, res) => {
  return res.render('private', { user: req.user });
});

export default routes;
