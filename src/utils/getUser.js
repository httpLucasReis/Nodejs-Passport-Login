const users = require('../mock/users');

module.exports = {
  byEmail: (email) => users.find(user => user.email === email),
  byId: (id) => users.find(user => user.id === id),
};