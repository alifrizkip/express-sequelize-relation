const { User, Group } = require('../models');

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
  
}

exports.updateGroup = async (req, res) => {
  
}

exports.deleteGroup = async (req, res) => {
  
}
