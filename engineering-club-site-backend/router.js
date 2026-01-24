const express = require('express');
const article_controller = require('./controller/article_controller');
const news_controller = require('./controller/news_controller');
const comment_controller = require('./controller/comment_controller');
const superadmin_controller = require('./controller/superadmin_controller');
const admin_controller = require('./controller/admin_controller');
const category_controller = require('./controller/category_controller');
const authentication_controller = require('./controller/authentication_controller');
const multer = require('multer');
const router = express.Router();

// Multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10MB text fields
    fileSize: 5 * 1024 * 1024, // 5MB file size
  },
});

router.get('/articles',article_controller.getArticles);
router.post('/addarticles',upload.single("file"),article_controller.addArticles);
router.patch('/updatearticles/:id',upload.single("file"),article_controller.updateArticles);
router.delete('/deletearticles/:id',article_controller.deleteArticles);

router.get('/news',news_controller.getNews);
router.post('/addnews',upload.single("file"),news_controller.addNews);
router.patch('/updatenews/:id',upload.single("file"),news_controller.updateNews);
router.delete('/deletenews/:id',news_controller.deleteNews);

router.get('/comments',comment_controller.getComments);
router.post('/addcomments',comment_controller.addComments);
router.delete('/deletecomments/:id',comment_controller.deleteComments);

router.get('/superadmin',superadmin_controller.getSuperAdmin);
router.patch('/updatesuperadmin/:id',superadmin_controller.updateSuperAdmin);
router.post('/sendotpsuperadmin',superadmin_controller.sendSuperAdminOTP);
router.patch('/resetpasswordsuperadmin/:email',superadmin_controller.resetSuperAdminPassword);

router.get('/admin',admin_controller.getAdmin);
router.post('/addadmin',admin_controller.addAdmin);
router.patch('/updateadmin/:id',admin_controller.updateAdmin);
router.delete('/deleteadmin/:id',admin_controller.deleteAdmin);
router.post('/sendotpadmin',admin_controller.sendAdminOTP);
router.patch('/resetpasswordadmin/:email',admin_controller.resetAdminPassword);

router.get('/category',category_controller.getCategory);
router.post('/addcategory',category_controller.addCategory);
router.patch('/updatecategory/:id',category_controller.updateCategory);
router.delete('/deletecategory/:id',category_controller.deleteCategory);

router.post('/authadmin',authentication_controller.getAuthAdmin);
router.post('/authsuperadmin',authentication_controller.getAuthSuperAdmin);

module.exports = router; 