var jwt = require("jsonwebtoken");
const config = require("../config");
const createError = require("http-errors");
function authenticateJWT() {
    return function (req, res, next) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    throw createError(403, "PM-ERR-005");
                }

                req.userId = user.aud;
                next();
            });
        } else {
            throw createError(401, "PM-ERR-001");
        }
    }
}

module.exports = {
    authenticateJWT
}