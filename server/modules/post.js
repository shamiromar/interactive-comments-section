const db = require("./connection.js");
const mongoose = require("mongoose");

const PostSchema = mongoose.model("Post", {
  title: String,
  content: String,
  username: String,
  userId: String,
  date: String,
  upvotes: Number,
});

module.exports = PostSchema;
