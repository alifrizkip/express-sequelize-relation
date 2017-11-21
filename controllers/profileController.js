const jwt = require('jsonwebtoken');

const {
  User, Post, Group, Address,
} = require('../models');

const extractToken = (authHeader) => {
  const token = authHeader.split(' ').pop();
  return jwt.verify(token, 'rahasia');
};

exports.getProfile = async (req, res, next) => {
  const userInfo = extractToken(req.headers.authorization);
  try {
    const user = await User.findOne({
      where: { id: userInfo.id },
      include: [{
        model: Address,
        as: 'address',
        attributes: ['address'],
      }, {
        model: Post,
        as: 'posts',
        attributes: ['post'],
      },
      {
        model: Group,
        as: 'groups',
        attributes: ['group'],
        through: {
          // model: UserGroup,
          attributes: [],
        },
      }],
      attributes: ['id', 'name', 'email'],
    });
    // res.json(user);
    req.data = { user };
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.updateProfile = async (req, res) => {
  const userInfo = extractToken(req.headers.authorization);
  User.update({
    name: req.body.name,
  }, {
    where: { id: userInfo.id },
  });
  res.json('Success');
};

exports.getAddress = async (req, res) => {
  const userInfo = extractToken(req.headers.authorization);
  const user = await User.findOne({
    where: { id: userInfo.id },
  });
  const userAddress = await user.getAddress();
  res.json(userAddress);
};

exports.updateAddress = async (req, res) => {
  const userInfo = extractToken(req.headers.authorization);
  const user = await User.findOne({ where: { id: userInfo.id } });
  // const newAddress = await user.createAddress({ address: req.body.address });
  // user.setAddress(newAddress.id);
  Address.update({ address: req.body.address }, { where: { user_id: user.id } });
  res.json('Success');
};
