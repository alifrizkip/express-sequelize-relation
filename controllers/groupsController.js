const { User, Group, UserGroup } = require('../models');

exports.getAllGroup = async (req, res) => {
  const groups = await Group.findAll({
    attributes: {
      exclude: ['created_at', 'updated_at'],
    },
  });
  res.json(groups);
};

exports.getDetailGroup = async (req, res) => {
  const group = await Group.findOne({
    where: { id: req.params.id },

    include: [{
      model: User,
      as: 'users',
      attributes: ['name', 'email'],
      through: {
        attributes: [],
      },
    }],

    attributes: {
      exclude: ['created_at', 'updated_at'],
    },
  });
  res.json(group);
};

exports.createGroup = async (req, res) => {
  Group.create({
    group: req.body.group,
  });

  res.json('Success');
};

exports.updateGroup = async (req, res) => {

};

exports.deleteGroup = async (req, res) => {

};

exports.addMember = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.body.user_id },
  });

  const userIsMember = await UserGroup.findOne({
    where: {
      group_id: req.params.id,
      user_id: user.id,
    },
  });

  if (userIsMember) {
    return res.status(406).json({
      message: 'User is already member in this group',
    });
  }

  UserGroup.build({
    user_id: user.id,
    group_id: req.params.id,
  })
    .save();
  return res.json('Success');
};

exports.deleteMember = async (req, res) => {
  UserGroup.destroy({
    where: {
      group_id: req.params.id,
      user_id: req.body.user_id,
    },
  });

  res.json('Success delete member from group');
};
