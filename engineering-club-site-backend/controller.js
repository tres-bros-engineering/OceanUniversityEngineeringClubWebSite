const { response } = require('./app');
const Article = require('./article_model');
const News = require('./news_model');
const Comment = require('./comment_model');
const SuperAdmin = require('./superadmin_model');
const Admin = require('./admin_model');


const getArticles = (req, res, next) => {
    Article.find()
    .then(response => {
        res.json({response});
    })
    .catch(error => {
        res.json({error})
    })
};

const getNews = (req, res, next) => {
    News.find()
    .then(response => {
        res.json({response});
    })
    .catch(error => {
        res.json({error})
    })
};

const getComments = (req, res, next) => {
    Comment.find()
    .then(response => {
        res.json({response});
    })
    .catch(error => {
        res.json({error})
    })
};

const getSuperAdmin = (req, res, next) => {
    SuperAdmin.find()
    .then(response => {
        res.json({response});
    })
    .catch(error => {
        res.json({error})
    })
};

const getAdmin = (req, res, next) => {
    Admin.find()
    .then(response => {
        res.json({response});
    })
    .catch(error => {
        res.json({error})
    })
};

const addAdmin = (req, res, next) => {
    const admin = new Admin({
        id: Number(req.body.id) + 1,
        name: req.body.name,
        email: req.body.email,
        password: `${req.body.name.replace(/\s+/g, '%')}123`
    })

    admin.save()
    .then(response => {
        res.json({response});
    })
    .catch(error => {
        res.json({error})
    })
};

const updateAdmin = (req, res, next) => {
    const {id, name, email} = req.body;

    Admin.updateOne({id:Number(id)},{$set:{name:name,email:email}})
    .then(response => {
        console.log("update "+{id,name,email})
        res.json({response});
    })
    .catch(error => {
        res.json({error})
    })
};

const deleteAdmin = (req, res, next) => {
    const id = Number(req.body.id);
    Admin.deleteOne({id:id})
    .then(response => {
        console.log("delete id= "+ id)
        res.json({response});
    })
    .catch(error => {
        res.json({error})
    })
};

exports.getArticles = getArticles;
exports.getNews = getNews;
exports.getComments = getComments;
exports.getSuperAdmin = getSuperAdmin;
exports.getAdmin = getAdmin;
exports.addAdmin = addAdmin;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;