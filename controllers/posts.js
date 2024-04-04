const controller = {};

let posts = [
    {
        id: 0,
        title: "This is the first post",
        content: "This is the content of the first post"
    },
    {
        id: 1,
        title: "This is the second post",
        content: "This is the content of the second post"
    },
    {
        id: 2,
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
        id: posts.length,
        title: req.body.title,
        content: req.body.content
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