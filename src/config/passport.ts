import { PassportStatic } from 'passport';
import {
  Strategy as LocalStrategy,
  VerifyFunction,
  IVerifyOptions,
} from 'passport-local';
import { Types } from 'mongoose';

import User from '@models/User';

import UserContract from '@contracts/UserContract';

const initializePassport = (passport: PassportStatic) => {
  const verify: VerifyFunction = async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        const options: IVerifyOptions = {
          message: "There's no user with that username.",
        };
        return done(null, false, options);
      }

      const incorrectPassword = !(await user.verifyPassword(password));

      if (incorrectPassword) {
        const options = { message: 'Incorrect password.' };
        return done(null, false, options);
      }

      return done(null, user);
    } catch (err) {
      const options: IVerifyOptions = { message: 'Authentication failed.' };
      return done(err, false, options);
    }
  };

  const strategy = new LocalStrategy(verify);

  passport.use(strategy);
  passport.serializeUser((user: UserContract, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id: Types.ObjectId, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};

export default initializePassport;
