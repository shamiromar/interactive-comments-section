const db = require("./connection.js");
const mongoose = require("mongoose");

const CommentSchema = mongoose.model("Comments", {
  title: String, //main topic title
  content: String,
  username: String,
  userId: String,
  date: String,
  upvotes: Number,
});

module.exports = CommentSchema;
