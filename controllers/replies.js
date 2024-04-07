const controller = {};
const users = require ("./users");
const Post = require('../models/post');
const Reply = require('../models/reply');

controller.createItem = async (req, res) => {
    // TODO make sure this content exists...

    const reply = new Reply({
        content: req.body.content,
        author: req.userId,
    });
    await reply.save();

    const post = await Post.findById(req.body.postId);
    console.log(post);
    if (post != null) {
        post.replies.push(reply);
        await post.save();
    }

    // Create object and save to db
    // Find parent post or reply, and add to list

    return res.json({
        message: "Reply create OK"
    });
}

module.exports = controller;