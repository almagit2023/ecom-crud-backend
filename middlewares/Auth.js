const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers['authorization']; // header name lowercase

  if (!auth) {
    return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
  }

  const token = auth.split(' ')[1]; // handles "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData;
    next();
  } catch (err) {
    return res.status(403).json({
      message: 'Unauthorized access. JWT is wrong or expired',
    });
  }
};

module.exports = ensureAuthenticated;
