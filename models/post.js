const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: "user",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    replies: {
        type: [Schema.Types.ObjectId],
        ref: "reply"
    },
});

const Post = model('post', PostSchema);

module.exports = Post
