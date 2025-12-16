const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    id: Number,
    article_id: Number,
    date: String,
    name: String,
    email: String,
    comment: String,
})

const Comment = mongoose.model('Comment', commentSchema,'comments');

module.exports = Comment;