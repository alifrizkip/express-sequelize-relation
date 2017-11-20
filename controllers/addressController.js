const jwt = require('jsonwebtoken');

const { User, Address } = require('../models');

const extractToken = (authHeader) => {
  const token = authHeader.split(' ').pop();
  return jwt.verify(token, 'rahasia');
};

exports.getAddress = async (req, res) => {
  const userInfo = extractToken(req.headers.authorization);
  const user = await User.findById(userInfo.id);
  const address = await user.getAddress();
  res.json(address);
};

exports.updateAddress = async (req, res) => {
  const userInfo = extractToken(req.headers.authorization);
  Address.update({
    address: req.body.address,
  }, {
    where: {
      user_id: userInfo.id,
    },
  });
  res.json('success');
};
