const { User, Address } = require('../models');

exports.getAddress = async (req, res) => {
  const user = await User.findById(req.params.userId);
  const address = await user.getAddress();
  res.json(address);
};

exports.updateAddress = async (req, res) => {
  Address.update({
    address: req.body.address,
  }, {
    where: {
      user_id: req.params.userId,
    },
  });
  res.json('success');
};
