const { User, Post } = require('../models');

exports.getAllPost = async (req, res) => {
  const user = await User.findById(req.params.userId);
  const posts = await user.getPosts();
  res.json(posts);
};

exports.getPost = async (req, res) => {
  const user = await User.findById(req.params.userId);
  const post = await user.getPosts({ id: req.params.id });
  res.json(post);
};

exports.createPost = async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.createPost({
    post: req.body.post,
  });
  res.json('success');
};

exports.updatePost = async (req, res) => {
  Post.update({
    post: req.body.post,
  }, {
    where: {
      id: req.params.id,
      user_id: req.params.userId,
    },
  });
  res.json('Success');
};

exports.deletePost = async (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
      user_id: req.params.userId,
    },
  });
  res.json('Success');
};
