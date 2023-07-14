const Comment = require("../modules/comment.js");

//get all comments for one topic by title
const getAllCommentsByTitle = async (req, res) => {
  const comments = await Comment.find({ title: req.params.title });
  res.send(comments);
};

//get one comment from comment id
const getOneComment = async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.id });
  res.send(comment);
};

//make a comment
const postOneComment = async (req, res) => {
  const newComment = await Comment.create(req.body);
  res.send({ msg: "comment posted successfully" });
};

//delete a comment
const deleteComment = async (req, res) => {
  const deletedComment = await Comment.deleteOne({ _id: req.params.id });
  res.send({ msg: "comment deleted" });
};

//edit comment
const editComment = async (req, res) => {
  const editComment = await Comment.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.send({ msg: "comment edited " });
};

const getAllUserComments = async (req, res) => {
  const userComments = await Comment.find({ userId: req.params.userId });
  res.send(userComments);
};

module.exports = {
  getAllComments,
  getOneComment,
  postOneComment,
  deleteComment,
  editComment,
  getAllUserComments,
  getAllCommentsByTitle,
};
