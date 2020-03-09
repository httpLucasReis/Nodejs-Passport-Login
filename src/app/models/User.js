const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { versionKey: false });

UserSchema.pre('save', async function(next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;

  next();
});

module.exports = model('User', UserSchema);
