// post will have array of replies...reply will also have array of replies.
// link to user
// link to parent which can be post or reply (how to? inherit common props?)
// https://stackoverflow.com/questions/14627948/mongoose-populate-field-without-ref-option
// array of replies to this reply
// keep track of tree level to know what schema parent is?
// do I need parent? Or just maybe user of parent (to notify on reply)? Do I need that even?  One way may be fine.

const { Schema, model } = require('mongoose')

const ReplySchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: "user",
        required: true,
    },
    replies: {
        type: [Schema.Types.ObjectId],
        ref: "reply"
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

const Reply = model('reply', ReplySchema);

module.exports = Reply
