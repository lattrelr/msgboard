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

controller.login = (req, res) => {
    for(let i=0; i < users.length; i++) {
        if (users[i].name == req.body.username) {
            if (bcrypt.compareSync(req.body.password, users[i].hash)) {
                const token = authjwt.createToken(users[i].id);
                return res.status(200).json({
                    username: users[i].name,
                    accessToken: token
                });
            }
        }
    }

    return res.status(401).json({
        status: "failed",
        message: "Invalid username or password.",
    });
};

controller.getIndex = async (req, res) => {
    const hash = await hashPassword("password2")
    users[0].hash = hash;
    res.json(users)
};

module.exports = controller;
