const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.checkToken = passport.authenticate('jwt', { session: false });

exports.allowFor = (...allowed) => {
  const isAllowed = role => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ').pop();
    const userInfo = jwt.verify(token, 'rahasia');

    if (userInfo.active === 'Y') {
      if (isAllowed(userInfo.role)) {
        return next();
      }
      return res.status(401).json('Forbidden - Not allowed');
    }

    return res.status(401).json('User suspended / locked');
  };
};
