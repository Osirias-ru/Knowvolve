const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { createToken, verifyToken };