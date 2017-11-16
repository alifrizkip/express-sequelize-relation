const bcrypt = require('bcrypt');
const { User, Post, Address } = require('../models');

exports.usersAll = async (req, res) => {
  const users = await User.findAll({
    include: [{
      model: Post,
      as: 'posts',
      attributes: {
        exclude: ['user_id', 'created_at', 'updated_at'],
      },
    }, {
      model: Address,
      as: 'address',
      attributes: {
        exclude: ['user_id', 'created_at', 'updated_at'],
      },
    }],

    attributes: {
      exclude: ['password', 'created_at', 'updated_at'],
    },
  });
  res.json(users);
};

exports.usersDetail = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },

    include: [{
      model: Post,
      as: 'posts',
      attributes: {
        exclude: ['user_id', 'created_at', 'updated_at'],
      },
    }, {
      model: Address,
      as: 'address',
      attributes: {
        exclude: ['user_id', 'created_at', 'updated_at'],
      },
    }],

    attributes: {
      exclude: ['password', 'created_at', 'updated_at'],
    },
  });
  res.json(user);
};

exports.usersCreate = async (req, res) => {
  User.build({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    address: [
      { address: req.body.address },
    ],
  }, {
    include: [{
      model: Address,
      as: 'address',
    }],
  })
    .save();
  res.json({
    message: 'Create new user successfully',
  });
};

exports.usersUpdate = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });
  const address = await Address.findOne({
    where: { user_id: user.id },
  });

  if (address) {
    address.update({ address: req.body.address });
  } else {
    Address.create({ address: req.body.address, user_id: user.id });
  }

  user.update({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  res.json({
    message: 'Update users successfully',
  });
};

exports.usersDelete = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  user.destroy();
  return res.json({
    message: 'User successfully deleted',
  });
};
