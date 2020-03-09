const bcrypt = require('bcrypt');

const User = require('../models/User');

class AppController {
  index(req, res) {
    res.render('index', { name: req.user.name });
  }

  login(req, res) {
    res.render('login');
  }

  GET_register(req, res) {
    res.render('register')
  }

  async POST_register(req, res) {
    try {
      const { name, email, password } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        req.flash('conflict', 'This user already exists');
        return res.redirect('/register');
      }

      await User.create({ name, email, password });
      res.redirect('/login');
    } catch {
      res.redirect('/register');
    }
  }

  logout(req, res) {
    req.logOut();
    res.redirect('/login');
  }
}

module.exports = new AppController();
