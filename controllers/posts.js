const controller = {};
const users = require ("./users");
const Post = require('../models/post');
const Reply = require('../models/reply');

controller.getIndex = async (req, res) => {
    const postList = await Post.find({},{ title: 1, author: 1, date: 1 })
        .populate({path: "author", select: "username"});
    res.json(postList);
};

controller.createItem = async (req, res) => {
    // TODO make sure this content exists...
    await Post.create({ 
        title: req.body.title,
        content: req.body.content,
        author: req.userId,
    });

    return res.json({
        message: "Post create OK"
    });
}

controller.getItem = async (req, res) => {
    const post = await Post.findById(req.params.postId)
        .populate([
            {path: "author", select: "username"},
            {path: "replies", populate:
                {path: "author", select: "username"},
            }
        ]);
    
    res.json(post);
};

controller.updateItem = (req, res) => {

}

module.exports = controller;