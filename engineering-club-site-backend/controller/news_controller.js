const News = require('../model/news_model');
const { Dropbox } = require("dropbox");
require('dotenv').config();

const dbx = new Dropbox({
  clientId: process.env.DROPBOX_CLIENT_ID,
  clientSecret: process.env.DROPBOX_CLIENT_SECRET,
  refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
});

const getNews = async (req, res, next) => {
    try {
        const news = await News.find({})
        res.status(200).json({response: news});
    } catch (err) {
        res.status(500).json({error: "Internal Server Error."})
    }
};

const addNews = async (req, res, next) => {
    try {
        const file = req.file;

        // Upload file to Dropbox
        const response = await dbx.filesUpload({
            path: `/news/${Date.now()}_${file.originalname}`,
            contents: file.buffer,
            mode: { ".tag": "overwrite" }
        });

        // Get shared link
        const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
            path: response.result.path_lower
        });

        // Convert to direct image URL
        const imageUrl = sharedLink.result.url.replace("&dl=0", "&raw=1");

        // Create news
        const news = new News({
            id: Number(req.body.id) + 1,
            title: req.body.title,
            img: imageUrl,
            date: new Date(),
            body: req.body.body,
            admin_id: req.body.admin_id,
            like: Number(0),
            dislike: Number(0),
            views: Number(0),
            publish: req.body.publish,
            dropboxPath: response.result.path_lower
        })

        const savedNews = await news.save();
        res.status(201).json({
          response: savedNews,
          message: "News created successfully.",
        });
        console.log("News created successfully.")
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

const updateNews = async (req, res, next) => {
    try {
      const id = req.params.id;
      const file = req.file;

      const newsExist = await News.findOne({ id: id });
      if (!newsExist) {
        return res.status(404).json({ message: "News not found." });
      }

      if (file) {
        // Get old Dropbox file path
        const dropboxFilePath = newsExist.dropboxPath;

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
          path: `/news/${Date.now()}_${file.originalname}`,
          contents: file.buffer,
          mode: { ".tag": "overwrite" },
        });

        // Get new shared link
        const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
            path: response.result.path_lower
        });

        // Convert to direct image URL
        const imageUrl = sharedLink.result.url.replace("&dl=0", "&raw=1");

        // Update news with new image
        await News.findOneAndUpdate(
          { id: id },
          {
            $set: {
              img: imageUrl,
              dropboxPath: response.result.path_lower,
            },
          }
        );
      }

      // Update news text fields
      const updatedNews = await News.findOneAndUpdate(
        { id: id },
        {
          $set: {
            title: req.body.title,
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
        response: updatedNews,
        message: "News updated successfully.",
      });
      console.log("News updated successfully.");
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error." });
    }
};

const deleteNews = async (req, res, next) => {
    try {
        const id = req.params.id;
        const newsExist = await News.findOne({id:id});
        if (!newsExist) {
            return res.status(404).json({message: "News not found."});
        }
        // Get dropbox file path
        const dropboxFilePath = newsExist.dropboxPath;

        await News.findOneAndDelete({ id: id });

        // Delete from Dropbox
        if (dropboxFilePath) {
            try {
                await dbx.filesDeleteV2({ path: dropboxFilePath });
                console.log("Dropbox file deleted");
            } catch (err) {
                console.error("Error deleting file from Dropbox");
            }
        }

        res.status(200).json({ message: "News deleted successfully." });
        console.log("News deleted successfully.");
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

exports.getNews = getNews;
exports.addNews = addNews;
exports.updateNews = updateNews;
exports.deleteNews = deleteNews;