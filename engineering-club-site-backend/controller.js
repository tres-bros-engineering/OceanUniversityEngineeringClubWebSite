const { response } = require('./app');
const Article = require('./article_model');
const News = require('./news_model');
const Comment = require('./comment_model');
const SuperAdmin = require('./superadmin_model');
const Admin = require('./admin_model');
const { Dropbox } = require("dropbox");
require('dotenv').config();

const dbx = new Dropbox({
  clientId: process.env.DROPBOX_CLIENT_ID,
  clientSecret: process.env.DROPBOX_CLIENT_SECRET,
  refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
});

// Articles Controller
const getArticles = (req, res, next) => {
    Article.find()
    .then(response => {
        res.status(200).json({response});
    })
    .catch(() => {
        res.status(500).json({error: "Internal Server Error."})
    })
};

const addArticles = async (req, res, next) => {
    try {
        const file = req.file;

        // Upload file to Dropbox
        const response = await dbx.filesUpload({
            path: `/articles/${Date.now()}_${file.originalname}`,
            contents: file.buffer,
            mode: { ".tag": "overwrite" }
        });

        // Get shared link
        const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
            path: response.result.path_lower
        });

        // Convert to direct image URL
        const imageUrl = sharedLink.result.url.replace("&dl=0", "&raw=1");

        // Create article
        const article = new Article({
            id: Number(req.body.id) + 1,
            title: req.body.title,
            category: req.body.category,
            img: imageUrl,
            date: new Date(),
            body: req.body.body,
            admin_id: req.body.admin_id,
            like: Number(0),
            dislike: Number(0),
            views: Number(0),
            publish: req.body.publish,
            dropboxPath: response.result.path_lower
        });

        const savedArticle = await article.save();
        res.status(201).json({
          response: savedArticle,
          message: "Article has been created successfully.",
        });
        console.log("Article has been created successfully.")
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

const updateArticles = async (req, res, next) => {
    try {
      const id = req.params.id;
      const file = req.file;

      const articleExist = await Article.findOne({ id: id });
      if (!articleExist) {
        return res.status(404).json({ message: "Article Not Found" });
      }

      if (file) {
        // Get old Dropbox file path
        const dropboxFilePath = articleExist.dropboxPath;

        // Delete the old file from Dropbox if it exists
        if (dropboxFilePath) {
          try {
            await dbx.filesDeleteV2({ path: dropboxFilePath });
            console.log("Dropbox file updated");
          } catch (err) {
            console.error("Error updating file from Dropbox");
          }
        }

        // Upload new file to Dropbox
        const response = await dbx.filesUpload({
          path: `/articles/${Date.now()}_${file.originalname}`,
          contents: file.buffer,
          mode: { ".tag": "overwrite" },
        });

        // Get new shared link
        const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
            path: response.result.path_lower
        });

        // Convert to direct image URL
        const imageUrl = sharedLink.result.url.replace("&dl=0", "&raw=1");

        // Update article with new image
        await Article.findOneAndUpdate(
          { id: id },
          {
            $set: {
              img: imageUrl,
              dropboxPath: response.result.path_lower,
            },
          }
        );
      }

      // Update article text fields
      const updatedArticle = await Article.findOneAndUpdate(
        { id: id },
        {
          $set: {
            title: req.body.title,
            category: req.body.category,
            body: req.body.body,
            like: req.body.like,
            dislike: req.body.dislike,
            views: req.body.views,
            publish: req.body.publish,
          },
        },
        { new: true }
      );

      res.status(200).json({
        response: updatedArticle,
        message: "Article has been updated successfully.",
      });
      console.log("Article has been updated successfully.");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error." });
    }
};

const deleteArticles = async (req, res) => {
    try {
        const id = req.params.id;
        const articleExist = await Article.findOne({ id: id });
        if (!articleExist) {
            return res.status(404).json({ message: "Article Not Found" });
        }
        // Get dropbox file path
        const dropboxFilePath = articleExist.dropboxPath;

        await Article.findOneAndDelete({ id: id });

        // Delete from Dropbox
        if (dropboxFilePath) {
            try {
                await dbx.filesDeleteV2({ path: dropboxFilePath });
                console.log("Dropbox file deleted");
            } catch (err) {
                console.error("Error deleting file from Dropbox");
            }
        }

        res.status(200).json({ message: "Article has been deleted successfully." });
        console.log("Article has been deleted successfully.");
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// News Controller
const getNews = (req, res, next) => {
    News.find()
    .then(response => {
        res.json({response});
    })
    .catch(() => {
        res.json({error: "Internal Server Error."})
    })
};

const addNews = (req, res, next) => {
    const news = new News({
        id: Number(req.body.id) + 1,
        title: req.body.title,
        img: req.body.img,
        date: new Date(),
        body: req.body.body,
        admin_id: req.body.admin_id,
        like: Number(0),
        dislike: Number(0),
        views: Number(0),
        publish: req.body.publish
    })

    news.save()
    .then(response => {
        res.json({response});
    })
    .catch(() => {
        res.json({error: "Internal Server Error."})
    })
};

const updateNews = (req, res, next) => {
    const id = req.params.id;
    const {title, img, body, like, dislike, views, publish} = req.body;

    const newsExist = News.findOne({id:id});
    if (!newsExist) {
        return res.json({message: "The News Not Found"});
    }

    News.findOneAndUpdate({id:id},{$set:{title:title, img:img, body:body, like:like, dislike:dislike, views:views, publish:publish}})
    .then(response => {
        res.json({response});
    })
    .catch(() => {
        res.json({error: "Internal Server Error."})
    })
};

const deleteNews = (req, res, next) => {
    const id = req.params.id;
    const newsExist = News.findOne({id:id});
    if (!newsExist) {
      return res.json({message: "The News Not Found"});
    }
    News.findOneAndDelete({id:id})
    .then(() => {
        res.json({message: "The news has been deleted successfully."});
    })
    .catch(() => {
        res.json({error: "Internal Server Error."})
    })
};

// Comment Controller
const getComments = (req, res, next) => {
    Comment.find()
    .then(response => {
        res.json({response});
    })
    .catch(() => {
        res.json({error: "Internal Server Error."})
    })
};

const addComments = (req, res, next) => {
    const comment = new Comment({
        id: Number(req.body.id) + 1,
        article_id: Number(req.body.article_id),
        date: new Date(),
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    })

    comment.save()
    .then(response => {
        res.json({response});
    })
    .catch(() => {
        res.json({error: "Internal Server Error."})
    })
};

const deleteComments = (req, res, next) => {
    const id = req.params.id;
    const commentExist = Comment.findOne({id:id});
    if (!commentExist) {
      return res.json({message: "The Comment Not Found"});
    }
    Comment.findOneAndDelete({id:id})
    .then(() => {
        res.json({message: "The comment has been deleted successfully."});
    })
    .catch(() => {
        res.json({error: "Internal Server Error."})
    })
};

// Superadmin Controller
const getSuperAdmin = (req, res, next) => {
    SuperAdmin.find()
    .then(response => {
        res.json({response});
    })
    .catch(() => {
        res.json({error: "Internal Server Error."})
    })
};

const updateSuperAdmin = (req, res, next) => {
    const id = req.params.id;
    const {name, email, password} = req.body;

    const superAdminExist = SuperAdmin.findOne({id:id});
    if (!superAdminExist) {
        return res.json({message: "The Super Admin Not Found"});
    }

    SuperAdmin.findOneAndUpdate({id:id},{$set:{name:name,email:email,password:password}})
    .then(response => {
        res.json({response});
    })
    .catch(() => {
        res.json({error: "Internal Server Error."})
    })
};

// Admin Controller
const getAdmin = (req, res, next) => {
    Admin.find()
    .then(response => {
        res.json({response});
    })
    .catch(() => {
        res.json({error: "Internal Server Error."})
    })
};

const addAdmin = (req, res, next) => {
    const admin = new Admin({
        id: Number(req.body.id) + 1,
        name: req.body.name,
        email: req.body.email,
        password: `${req.body.name.replace(/\s+/g, '%')}123`
    })

    const {email} = admin;
    Admin.findOne({email})
    .then((adminExist) => {
        if (adminExist) {
            return res.json({message: "The admin already exists."});
        }
            
        admin.save()
        .then(response => {
            res.json({response});
        })
        .catch(() => {
            res.json({error: "Internal Server Error."})
        })
    })
};

const updateAdmin = (req, res, next) => {
    const id = req.params.id;
    const {name, email, password} = req.body;

    const adminExist = Admin.findOne({id:id});
    if (!adminExist) {
        return res.json({message: "The Admin Not Found"});
    }

    Admin.findOneAndUpdate({id:id},{$set:{name:name,email:email,password:password}})
    .then(response => {
        res.json({response});
    })
    .catch(() => {
        res.json({error: "Internal Server Error."})
    })
};

const deleteAdmin = (req, res, next) => {
    const id = req.params.id;
    const adminExist = Admin.findOne({id:id});
    if (!adminExist) {
      return res.json({message: "The Admin Not Found"});
    }
    Admin.findOneAndDelete({id:id})
    .then(() => {
        res.json({message: "The admin has been deleted successfully."});
    })
    .catch(() => {
        res.json({error: "Internal Server Error."})
    })
};

exports.getArticles = getArticles;
exports.addArticles = addArticles;
exports.updateArticles = updateArticles;
exports.deleteArticles = deleteArticles;
exports.getNews = getNews;
exports.addNews = addNews;
exports.updateNews = updateNews;
exports.deleteNews = deleteNews;
exports.getComments = getComments;
exports.addComments = addComments;
exports.deleteComments = deleteComments;
exports.getSuperAdmin = getSuperAdmin;
exports.updateSuperAdmin = updateSuperAdmin;
exports.getAdmin = getAdmin;
exports.addAdmin = addAdmin;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;