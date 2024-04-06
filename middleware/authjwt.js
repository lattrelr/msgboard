const jwt = require("jsonwebtoken");
const authjwt = {};
// TODO store in env
const privateKey = "1cd83fa16555147ab7f4923937107f57b609cb47";

authjwt.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
        return res.status(403).json({
            message: "No token provided!"
        });
    }

    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        req.userId = decoded.id;
        console.log("Verified user " + req.userId);
        next();
    });
  };

authjwt.createToken = (userId) => {
    const token = jwt.sign(
        { id: userId },
        privateKey,
        { expiresIn: 86400 } // 24 hours
    );
    return token;
}

  module.exports = authjwt;