const Comment = require('../model/comment_model');

const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({});
        res.status(200).json({response: comments});
    } catch (err) {
        res.status(500).json({error: "Internal Server Error."})
    }
};

const addComments = async (req, res, next) => {
    try {
        const comment = new Comment({
            id: Number(req.body.id) + 1,
            article_id: Number(req.body.article_id),
            date: new Date(),
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment
        })

        const savedComment = await comment.save()
        res.status(201).json({
            response: savedComment,
            message: "Comment posted successfully.",
        });
        console.log("Comment created successfully.")
    } catch (err) {
        res.status(500).json({error: "Internal Server Error."})
    }
};

const deleteComments = async (req, res, next) => {
    try {
        const id = req.params.id;
        const commentExist = await Comment.findOne({id:id});
        if (!commentExist) {
            return res.status(404).json({message: "Comment not found."});
        }
        
        await Comment.findOneAndDelete({id:id})
        res.status(200).json({ message: "Comment deleted successfully." });
        console.log("Comment deleted successfully.");
    } catch (err) {
        res.status(500).json({error: "Internal Server Error."})
    }
};

exports.getComments = getComments;
exports.addComments = addComments;
exports.deleteComments = deleteComments;