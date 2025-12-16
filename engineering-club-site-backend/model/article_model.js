const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    id: Number,
    title: String,
    category: String,
    img: String,
    date: String,
    body: String,
    admin_id: Number,
    like: Number,
    dislike: Number,
    views: Number,
    publish: Boolean,
    dropboxPath: String
})


const Article = mongoose.model('Article', articleSchema,'articles');


module.exports = Article;
