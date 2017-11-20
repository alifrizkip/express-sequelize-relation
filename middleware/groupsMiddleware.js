const jwt = require('jsonwebtoken');

const { User, Group, UserGroup } = require('../models');

const extractToken = (authHeader) => {
  const token = authHeader.split(' ').pop();
  return jwt.verify(token, 'rahasia');
};

exports.isAdminGroup = async (req, res, next) => {
  const userInfo = extractToken(req.headers.authorization);
  const userGroup = await UserGroup.findOne({
    where: {
      user_id: userInfo.id,
      group_id: req.params.id,
    },
  });
  if (!userGroup || userGroup.user_role !== 'admin') {
    return res.status(401).json('You aren\'t admin of this group');
  }
  return next();
};
