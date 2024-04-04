const controller = {};

let posts = [
    {
        id: 1,
        title: "This is the first post",
        content: "This is the content of the first post"
    },
    {
        id: 2,
        title: "This is the second post",
        content: "This is the content of the second post"
    },
    {
        id: 3,
        title: "This is the third post",
        content: "This is the content of the third post"
    }
];

controller.getIndex = (req, res) => {
    res.json(posts)
};

controller.createItem = (req, res) => {
    // TODO make sure this content exists...
    posts.push({
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    });

    // TODO how to respond to post req
    res.send("POST");
}

controller.getItem = (req, res) => {
    let idx = req.params.postId - 1;
    res.json(posts[idx]);
};

module.exports = controller;