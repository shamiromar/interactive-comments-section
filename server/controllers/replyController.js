const Reply = require("../modules/reply");

//get all replies on a comment
const getReplyByCommentId = async (req, res) => {
  const reply = await Reply.find({ commentId: req.params.commentId });
  res.send(reply);
};

//create reply
const postReply = async (req, res) => {
  await Reply.create(req.body);
  res.send({ msg: "send successfully" });
};

//delete reply
const deleteReply = async (req, res) => {
  await Reply.deleteOne({ _id: req.params.id });
  res.send({ msg: "deleted" });
};

//edit reply
const editReply = async (req, res) => {
  await Reply.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.send({ msg: "Update saved" });
};

module.exports = {
  getReplyByCommentId,
  postReply,
  deleteReply,
  editReply,
};












// const Reply = require("../modules/reply");

// //get all replies on a comment
// const getReplyByCommentId = async (req, res) => {
//   const reply = await Reply.find({ commentId: req.params.commentId });
//   res.send(reply);
// };

// //create reply
// const postReply = async (req, res) => {
//   await Reply.create(req.body);
//   res.send({ msg: "send successfully" });
// };

// //delete reply
// const deleteReply = async (req, res) => {
//   await Reply.deleteOne({ _id: req.params.id });
//   res.send({ msg: "deleted" });
// };

// //edit reply
// const editReply = async (req, res) => {
//   await Reply.findByIdAndUpdate({ _id: req.params.id }, req.body);
//   res.send({ msg: "Update saved" });
// };

// module.exports = {
//   getReplyByCommentId,
//   postReply,
//   deleteReply,
//   editReply,
// };
