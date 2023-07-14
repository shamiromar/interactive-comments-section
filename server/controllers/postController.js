const Post = require("../modules/post");

//get all posts
const getAllPosts = async (req, res) => {
  const post = await Post.find();
  res.send(post);
};

//get one post from id
const getOnePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.send(post);
};

//get one post from title
const getOnePostFromTitle = async (req, res) => {
  const post = await Post.findOne({ title: req.params.title });
  res.send(post);
};

//get posts from one user
const getAllUserPost = async (req, res) => {
  const userPost = await Post.find({ userId: req.params.userId });
  res.send(userPost);
};

//delete one post
const deletePost = async (req, res) => {
  await Post.deleteOne({ _id: req.params.id });
  res.send({ msg: "post deleted" });
};

//edit one post
const editPost = async (req, res) => {
  await Post.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.send({ msg: "post edited " });
};

module.exports = {
  getAllPosts,
  getAllUserPost,
  getOnePost,
  getOnePostFromTitle,
  deletePost,
  editPost,
};
