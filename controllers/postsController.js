const jwt = require('jsonwebtoken');

const { User, Post } = require('../models');

const extractToken = (authHeader) => {
  const token = authHeader.split(' ').pop();
  return jwt.verify(token, 'rahasia');
};

exports.getAllPost = async (req, res) => {
  const userInfo = extractToken(req.headers.authorization);
  const user = await User.findById(userInfo.id);
  const posts = await user.getPosts();
  res.json(posts);
};

exports.getPost = async (req, res) => {
  const userInfo = extractToken(req.headers.authorization);
  const user = await User.findById(userInfo.id);
  const post = await user.getPosts({ id: req.params.id });
  res.json(post);
};

exports.createPost = async (req, res) => {
  const userInfo = extractToken(req.headers.authorization);
  const user = await User.findById(userInfo.id);
  user.createPost({
    post: req.body.post,
  });
  res.json('success');
};

exports.updatePost = async (req, res) => {
  const userInfo = extractToken(req.headers.authorization);
  Post.update({
    post: req.body.post,
  }, {
    where: {
      id: req.params.id,
      user_id: userInfo.id,
    },
  });
  res.json('Success');
};

exports.deletePost = async (req, res) => {
  const userInfo = extractToken(req.headers.authorization);
  Post.destroy({
    where: {
      id: req.params.id,
      user_id: userInfo.id,
    },
  });
  res.json('Success');
};
