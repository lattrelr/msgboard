const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

// Express validator for input
// express-async-handler for controller errors

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
    res.send("ERROR");
});

app.listen(port, () => {
    console.log(`Started app on port ${port}`);
});

module.exports = app;
