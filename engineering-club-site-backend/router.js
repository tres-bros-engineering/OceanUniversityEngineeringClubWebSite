const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.get('/articles',controller.getArticles);
router.get('/news',controller.getNews);
router.get('/comments',controller.getComments);
router.get('/superadmin',controller.getSuperAdmin);
router.get('/admin',controller.getAdmin);
router.post('/addadmin',controller.addAdmin);
router.post('/updateadmin',controller.updateAdmin);
router.post('/deleteadmin',controller.deleteAdmin);


module.exports = router; 