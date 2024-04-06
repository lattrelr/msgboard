const bcrypt = require ('bcrypt');
const authjwt = require ('../middleware/authjwt');
const controller = {};

const users = [
    {
        id: 0,
        name: "ryan",
        // "password"
        hash: "$2b$10$OmpiXmRVKEktractMoTv0uDcA1cRNog7V.LaPR2v.RFy4XSpULTA2"
    },
    {
        id: 1,
        name: "rocky",
        // "password2",
        hash: "$2b$10$mQr/YRnj../WYHMsQe/vvesu8gLBKIcViSdfcRQQKuZTTsVwya2ri"
    }
];

// TODO this doesn't belong here
controller.getUserNameById = (userId) => {
    for(let i=0; i < users.length; i++) {
        if (userId == users[i].id)
            return users[i].name;
    }
    return "";
}

async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) resolve("")
            resolve(hash);
        });
    });
}

controller.login = async (req, res) => {
    for(let i=0; i < users.length; i++) {
        if (users[i].name == req.body.username) {
            if (bcrypt.compareSync(req.body.password, users[i].hash)) {
                const token = authjwt.createToken(users[i].id);

                let options = {
                    maxAge: 60 * 60 * 1000, // would expire in 60 minutes
                    httpOnly: true, // The cookie is only accessible by the web server
                    // STOPSHIP FIXME: This should be true, but we are not https.
                    secure: false,
                    sameSite: "Strict",
                };
            
                res.cookie("SessionID", token, options);
                return res.status(200).json({
                    username: controller.getUserNameById(users[i].id),
                });
            }
        }
    }

    return res.status(401).json({
        status: "failed",
        message: "Invalid username or password.",
    });
};

controller.signup = async (req, res) => {
    const hashedpw = await hashPassword(req.body.password);
    users.push({
        id: users.length,
        name: req.body.username,
        hash: hashedpw
    });

    console.log("Created user");

    return res.json({
        message: "User create OK"
    });
};

controller.getActiveUser = (req, res) => {
    const userName = controller.getUserNameById(req.userId);
    return res.status(200).json({
        username: userName
    });
}

controller.logout = (req, res) => {
    res.clearCookie("SessionID");
    return res.status(200).json({
        message: "Logged out"
    });
}

module.exports = controller;
