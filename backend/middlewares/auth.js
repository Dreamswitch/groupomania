const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        req.user = userId;
        next();
      }
    } else {
      console.log('no token');
      res.status(302).send('not logged');
    }
  } catch {
    res.status(401).json({
      error: 'Usurpation Id !'
    });
  }
};