const UserFunc = require('../models/function/userFunction');

exports.usersAll = async (req, res) => {
  const users = await UserFunc.usersAll();
  res.json(users);
};

exports.usersDetail = async (req, res) => {
  const user = await UserFunc.usersDetail(req.params.id);
  res.json(user);
};

exports.usersCreate = async (req, res) => {
  const {
    name, email, password, address,
  } = req.body;
  const data = {
    name, email, password, address,
  };
  UserFunc.usersCreate(data);
  res.json({ message: 'Create new user successfully' });
};

exports.usersUpdate = async (req, res) => {
  try {
    const {
      name, email, password, address,
    } = req.body;
    const data = {
      id: req.params.id, name, email, password, address,
    };
    await UserFunc.usersUpdate(data);
    return res.json({ message: 'Update users successfully' });
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

exports.usersDelete = async (req, res) => {
  try {
    await UserFunc.usersDelete(req.params.id);
    return res.json({ message: 'User successfully deleted' });
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};
