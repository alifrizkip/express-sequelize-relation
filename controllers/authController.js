const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

exports.loginProcess = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.status(404).json('Email not registered');
  }

  const hashCompare = await bcrypt.compare(req.body.password, user.password);
  if (!hashCompare) {
    return res.status(406).json('Password is incorrect');
  }

  const payload = {
    id: user.id,
    role: user.role,
    active: user.active,
  };
  const token = jwt.sign(payload, 'rahasia', {
    expiresIn: '10d',
  });
  return res.json({
    message: 'Login successfully',
    data: { token },
  });
};

exports.registerProcess = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const userInfo = {
    name: req.body.name,
    email: req.body.email,
    password: hash,
  };

  const isEmailRegistered = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (isEmailRegistered) {
    return res.json('Email is registered');
  }

  User.create(userInfo);
  return res.json('Register successfully');
};
