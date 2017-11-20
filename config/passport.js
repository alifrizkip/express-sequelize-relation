const JwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const { User } = require('../models');

module.exports = (passport) => {
  const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'rahasia',
  };

  passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    const user = await User.findOne({
      where: { id: jwtPayload.id },
    });

    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  }));
};
