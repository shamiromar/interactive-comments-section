const db = require("./connection.js");
const mongoose = require("mongoose");

const ReplySchema = mongoose.model("Reply", {
  content: String,
  username: String,
  userId: String,
  date: String,
  commentId: String,
});

module.exports = ReplySchema;
