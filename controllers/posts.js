const controller = {};
const users = require ("./users");

let posts = [
    {
        id: 0,
        title: "This is the first post",
        content: "This is the content of the first post",
        author: "ryan",
        date: new Date().toISOString().slice(0, 10)
    },
    {
        id: 1,
        title: "This is the second post",
        content: "This is the content of the second post",
        author: "ryan",
        date: new Date().toISOString().slice(0, 10)
    },
    {
        id: 2,
        title: "This is the third post",
        content: "This is the content of the third post",
        author: "ryan",
        date: new Date().toISOString().slice(0, 10)
    }
];

controller.getIndex = (req, res) => {
    res.json(posts)
};

controller.createItem = (req, res) => {
    // TODO make sure this content exists...

    let username = users.getUserNameById(req.userId);

    posts.push({
        id: posts.length,
        title: req.body.title,
        content: req.body.content,
        author: username,
        date: new Date().toISOString().slice(0, 10)
    });

    // TODO how to respond to post req
    res.send("POST");
}

controller.getItem = (req, res) => {
    let idx = req.params.postId;
    res.json(posts[idx]);
};

controller.updateItem = (req, res) => {

}

module.exports = controller;