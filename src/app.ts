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
  private _express: Application;

  get express(): Application {
    return this._express;
  }
  set express(express: Application) {
    this._express = express;
  }

  public constructor() {
    this._express = express();

    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings() {
    this._express.set('views', resolve(__dirname, 'app', 'views'));
    this._express.set('view engine', 'ejs');
    this._express.set('PORT', process.env.PORT || 3333);
  }

  private middlewares() {
    this._express.use(express.urlencoded({ extended: false }));
    this._express.use(express.json());
    this._express.use(helmet());

    const sessionOptions: SessionOptions = {
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
    };
    this._express.use(session(sessionOptions));
    this._express.use(flash());

    this._express.use(passport.initialize());
    this._express.use(passport.session());
  }

  private routes() {
    this._express.use('/public', express.static(resolve(__dirname, 'public')));
    this._express.use(routes);

    // To handle pages not found, this middleware must be after the routes
    this._express.use(handlePageNotFound);

  }
}

export default new App().express;
