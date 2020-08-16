import dotenv from 'dotenv';
import express, { Application } from 'express';
import session, { SessionOptions } from 'express-session';
import flash from 'express-flash';
import passport from 'passport';
import { resolve } from 'path';
import helmet from 'helmet';

import handlePageNotFound from './app/middlewares/handlePageNotFound';
import routes from './routes';
import initializePassport from './config/passport';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

initializePassport(passport);

class App {
  public express: Application;

  public constructor() {
    this.express = express();

    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings() {
    this.express.set('views', resolve(__dirname, 'app', 'views'));
    this.express.set('view engine', 'ejs');
    this.express.set('PORT', process.env.PORT || 3333);
  }

  private middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json());
    this.express.use(helmet());

    const sessionOptions: SessionOptions = {
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
    };
    this.express.use(session(sessionOptions));
    this.express.use(flash());

    this.express.use(passport.initialize());
    this.express.use(passport.session());
  }

  private routes() {
    this.express.use('/public', express.static(resolve(__dirname, 'public')));
    this.express.use(routes);

    // To handle pages not found, this middleware must be after the routes
    this.express.use(handlePageNotFound);
  }
}

export default new App().express;
