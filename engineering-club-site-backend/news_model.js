const mongoose = require('mongoose');
const { init } = require('./app');
const Schema = mongoose.Schema;


const newsSchema = new Schema({
    id: Number,
    title: String,
    img: String,
    date: String,
    body: String,
    author: String,
    like: Number,
    dislike: Number,
    publish: Boolean
    
})

const News = mongoose.model('News', newsSchema,'news');

module.exports = News;