const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('./controller');

//middlewares
app.use(cors());
app.use(
    express.urlencoded({
        extended:true
    })
);

app.use(express.json());

//REST APIs
app.get('/articles',(req, res)=>{
    controller.getArticles((req, res, next) => {
        res.send();
    })
});

app.get('/news',(req, res)=>{
    controller.getNews((req, res, next) => {
        res.send();
    })
});

app.get('/comments',(req, res)=>{
    controller.getComments((req, res, next) => {
        res.send();
    })
});

app.get('/superadmin',(req, res)=>{
    controller.getSuperAdmin((req, res, next) => {
        res.send();
    })
});

app.get('/admin',(req, res)=>{
    controller.getAdmin((req, res, next) => {
        res.send();
    })
});

app.post('/addadmin',(req,res)=>{
    controller.addAdmin(req.body,(callback) => {
        res.send();
    })
});

app.post('/updateadmin',(req,res)=>{
    controller.updateAdmin(req.body,(callback) => {
        res.send(callback);
    })
});

app.post('/deleteadmin',(req,res)=>{
    controller.deleteAdmin(req.body,(callback) => {
        res.send(callback);
    })
});

module.exports = app;