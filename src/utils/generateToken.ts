import crypto from 'crypto';

function generateToken() {
  const token = crypto.randomBytes(16).toString('hex');
  return token;
}

export default generateToken;
