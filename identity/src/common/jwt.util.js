var jwt = require("jsonwebtoken");
const config = require("../config");
const createError = require("http-errors");

function generateToken(identityId,payload) {
    try {       
        const secret = config.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "12h",
            issuer: "prestaMype",
            audience: identityId,
        };
        var token = jwt.sign({payload}, secret, options);
        return token;
    } catch (error) {
        console.error(error.message);
        throw createError(422, "PM-ERR-001");
    }
}

module.exports = {
    generateToken
};
