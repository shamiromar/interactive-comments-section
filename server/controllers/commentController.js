const Comment = require("../modules/comment.js");

const getAllComments = async (req, res) => {
  const comments = await Comment.find();
  res.send(comments);
};

const getOneComment = async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.id });
  res.send(comment);
};

const postOneComment = async (req, res) => {
  const newComment = await Comment.create(req.body);
  res.send({ msg: "comment posted successfully" });
};

const deleteComment = async (req, res) => {
  const deletedComment = await Comment.deleteOne({ _id: req.params.id });
  res.send({ msg: "comment deleted" });
};

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

const postReply = async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);

  const reply = {
    content: req.body.content,
    userId: req.body.userId,
    createdAt: req.body.createdAt,
  };

  comment.replies.push(reply);
  await comment.save();
  res.send({ msg: "reply posted successfully" })
};

module.exports = {
  getAllComments,
  getOneComment,
  postOneComment,
  deleteComment,
  editComment,
  getAllUserComments,
  postReply,
};
