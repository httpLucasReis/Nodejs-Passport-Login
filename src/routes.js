const routes = require('express').Router();
const passport = require('passport');

const { checkAuthenticated, checkNotAuthenticated } = require('./app/middlewares/auth');

const appController = require('./app/controllers/AppController');

routes.get('/', checkAuthenticated, appController.index);

routes.get('/login', checkNotAuthenticated, appController.login);
routes.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

routes.get('/register', checkNotAuthenticated, appController.GET_register);
routes.post('/register', checkNotAuthenticated, appController.POST_register);

routes.delete('/logout', appController.logout);

module.exports = routes;