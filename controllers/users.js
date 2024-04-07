const bcrypt = require ('bcrypt');
const authjwt = require ('../middleware/authjwt');
const User = require('../models/user');
const controller = {};

async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) resolve("")
            resolve(hash);
        });
    });
}

controller.login = async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (user != null) {
        if (bcrypt.compareSync(req.body.password, user.hash)) {
            const token = authjwt.createToken(user._id.toString());

            let options = {
                maxAge: 60 * 60 * 1000, // would expire in 60 minutes
                httpOnly: true, // The cookie is only accessible by the web server
                // STOPSHIP FIXME: This should be true, but we are not https.
                secure: false,
                sameSite: "Strict",
            };
        
            res.cookie("SessionID", token, options);
            return res.status(200).json({
                username: user.username,
            });
        }
    }

    return res.status(401).json({
        status: "failed",
        message: "Invalid username or password.",
    });
};

controller.signup = async (req, res) => {
    const hashedpw = await hashPassword(req.body.password);

    await User.create({ username: req.body.username, hash: hashedpw });

    console.log("Created user");

    return res.json({
        message: "User create OK"
    });
};

controller.getActiveUser = async (req, res) => {
    const user = await User.findById(req.userId);
    if (user != null) {
        return res.status(200).json({
            username: user.username
        });
    }

    return res.status(401).json({
        message: "Invalid username or password.",
    });
}

controller.logout = (req, res) => {
    res.clearCookie("SessionID");
    return res.status(200).json({
        message: "Logged out"
    });
}

module.exports = controller;
