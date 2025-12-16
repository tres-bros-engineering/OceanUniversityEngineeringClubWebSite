const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    id: Number,
    title: String,
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

const News = mongoose.model('News', newsSchema,'news');

module.exports = News;