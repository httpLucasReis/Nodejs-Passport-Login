if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const routes = require('./routes');
const initializePassport = require('./config/passport');
const {
  byEmail: getUserByEmail,
  byId: getUserById
} = require('./utils/getUser');
initializePassport(passport, getUserByEmail, getUserById);

class App {
  constructor() {
    this.express = express();

    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.express.set('view engine', 'ejs');
    this.express.set('views', './src/app/views');
    this.express.set('PORT', process.env.PORT || 3000);
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(flash());
    this.express.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.express.use(methodOverride('_method'));
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;