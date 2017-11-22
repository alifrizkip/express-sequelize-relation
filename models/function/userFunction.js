const bcrypt = require('bcrypt');
const {
  User, Group, Post, Address,
} = require('../../models');

User.usersAll = () => User.findAll({
  include: [{
    model: Address,
    as: 'address',
    attributes: {
      exclude: ['user_id', 'created_at', 'updated_at'],
    },
  }, {
    model: Post,
    as: 'posts',
    attributes: {
      exclude: ['user_id', 'created_at', 'updated_at'],
    },
  }, {
    model: Group,
    as: 'groups',
    attributes: ['group'],
    through: {
      attributes: ['user_role'],
    },
  }],
  attributes: {
    exclude: ['password', 'created_at', 'updated_at'],
  },
});

User.usersDetail = id => User.findOne({
  where: { id },

  include: [{
    model: Address,
    as: 'address',
  }, {
    model: Post,
    as: 'posts',
  }, {
    model: Group,
    as: 'groups',
    attributes: ['group'],
    through: {
      attributes: [],
    },
  }],

  attributes: {
    exclude: ['password', 'created_at', 'updated_at'],
  },
});

User.usersCreate = ({
  name, email, password, address,
}) => {
  User.build({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    address: [
      { address },
    ],
  }, {
    include: [{
      model: Address,
      as: 'address',
    }],
  })
    .save();
};

User.usersUpdate = async ({
  id, name, email, password, address,
}) => {
  try {
    const user = await User.findOne({
      where: { id },
    });
    if (!user) throw new Error('No user found');
    const userAddress = await Address.findOne({
      where: { user_id: user.id },
    });

    if (userAddress) {
      userAddress.update({ address });
    } else {
      Address.create({ address, user_id: user.id });
    }
    user.update({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
  } catch (e) {
    throw e;
  }
};

User.usersDelete = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
    });
    if (!user) throw new Error('No user found');
    user.destroy();
  } catch (e) {
    throw e;
  }
};

module.exports = User;
