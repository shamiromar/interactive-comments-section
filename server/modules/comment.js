const db = require('./connection.js');
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  content: String,
  email: String,
  userId: String,
  createdAt: Date,
});

const commentSchema = new mongoose.Schema({
  content: String,
  email: String,
  userId: String,
  createdAt: Date,
  upvotes: Number,
  replies: {
    type: [replySchema],
    default: [],
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;