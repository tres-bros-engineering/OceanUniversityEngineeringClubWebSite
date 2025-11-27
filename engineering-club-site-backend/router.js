const express = require('express');
const controller = require('./controller');
const multer = require('multer');
const router = express.Router();

// multer config here
// Store file in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10MB text fields
    fileSize: 5 * 1024 * 1024, // 5MB file size
  },
});

router.get('/articles',controller.getArticles);
router.post('/addarticles',upload.single("file"),controller.addArticles);
router.patch('/updatearticles/:id',upload.single("file"),controller.updateArticles);
router.delete('/deletearticles/:id',controller.deleteArticles);

router.get('/news',controller.getNews);
router.post('/addnews',controller.addNews);
router.patch('/updatenews/:id',controller.updateNews);
router.delete('/deletenews/:id',controller.deleteNews);

router.get('/comments',controller.getComments);
router.post('/addcomments',controller.addComments);
router.delete('/deletecomments/:id',controller.deleteComments);

router.get('/superadmin',controller.getSuperAdmin);
router.patch('/updatesuperadmin/:id',controller.updateSuperAdmin);

router.get('/admin',controller.getAdmin);
router.post('/addadmin',controller.addAdmin);
router.patch('/updateadmin/:id',controller.updateAdmin);
router.delete('/deleteadmin/:id',controller.deleteAdmin);


module.exports = router; 