const passport = require('passport');

exports.checkToken = passport.authenticate('jwt', { session: false });
