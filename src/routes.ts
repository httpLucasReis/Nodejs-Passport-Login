import { Router } from 'express';

// Controllers
import AuthController from './controllers/AuthController';

// Passport configuration
import passport from 'passport';

// Middlewares
import checkAuthentication from './middlewares/checkAuthentication';

const { checkAuthenticated, checkNotAuthenticated } = checkAuthentication;

// Routes
const routes = Router();

routes.get('/login', checkNotAuthenticated, AuthController.renderLogin);
routes.post('/login', passport.authenticate('local', {
  successRedirect: '/private',
  failureRedirect: '/login',
  failureFlash: true,
}));

routes.get('/register', checkNotAuthenticated, AuthController.renderRegister);
routes.post('/register', checkNotAuthenticated, AuthController.register);

routes.delete('/logout', checkAuthenticated, AuthController.logout);

routes.get('/private', checkAuthenticated, (req, res) => {
  return res.render('private', { user: req.user });
});

export default routes;
