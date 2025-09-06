const mongoose = require('mongoose');
const { init } = require('./app');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    id: Number,
    title: String,
    Category: String,
    img: String,
    date: String,
    body: String,
    author: String,
    like: Number,
    dislike: Number,
    publish: Boolean
    
})


const Article = mongoose.model('Article', articleSchema,'articles');


module.exports = Article;
