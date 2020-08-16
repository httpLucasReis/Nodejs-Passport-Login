import dotenv from 'dotenv';
import express, { Application } from 'express';
import session, { SessionOptions } from 'express-session';
import flash from 'express-flash';
import passport from 'passport';
import { resolve } from 'path';
import helmet from 'helmet';

import handlePageNotFound from '@middlewares/handlePageNotFound';
import initializePassport from '@config/passport';
import routes from './routes';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

initializePassport(passport);

class App {
  public express: Application;

  public constructor() {
    this.express = express();

    this.loadSettings();
    this.loadMiddlewares();
    this.loadRoutes();
  }

  private loadSettings() {
    this.express.set('views', resolve(__dirname, 'app', 'views'));
    this.express.set('view engine', 'ejs');
    this.express.set('PORT', process.env.PORT || 3333);
  }

  private loadMiddlewares() {
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

  private loadRoutes() {
    this.express.use('/public', express.static(resolve(__dirname, 'public')));
    this.express.use(routes);

    this.express.use(handlePageNotFound);
  }
}

export default new App().express;
