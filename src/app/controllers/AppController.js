const bcrypt = require('bcrypt');

const users = require('../../mock/users');

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

      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({
        id: Date.now().toString(),
        name: name,
        email: email,
        password: hashedPassword,
      });
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
