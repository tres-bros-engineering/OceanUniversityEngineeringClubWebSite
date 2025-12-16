const Article = require('../model/article_model');
const { Dropbox } = require("dropbox");
require('dotenv').config();

const dbx = new Dropbox({
  clientId: process.env.DROPBOX_CLIENT_ID,
  clientSecret: process.env.DROPBOX_CLIENT_SECRET,
  refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
});

const getArticles = async (req, res, next) => {
    try {
        const articles = await Article.find({});
        res.status(200).json({response: articles});
    } catch (err) {
        res.status(500).json({error: "Internal Server Error."})
    }
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
          message: "Article created successfully.",
        });
        console.log("Article created successfully.")
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
        return res.status(404).json({ message: "Article not found." });
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
        message: "Article updated successfully.",
      });
      console.log("Article updated successfully.");
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error." });
    }
};

const deleteArticles = async (req, res) => {
    try {
        const id = req.params.id;
        const articleExist = await Article.findOne({ id: id });
        if (!articleExist) {
            return res.status(404).json({ message: "Article not found." });
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

        res.status(200).json({ message: "Article deleted successfully." });
        console.log("Article deleted successfully.");
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

exports.getArticles = getArticles;
exports.addArticles = addArticles;
exports.updateArticles = updateArticles;
exports.deleteArticles = deleteArticles;