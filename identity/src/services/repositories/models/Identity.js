const mongoose = require("mongoose");
const createError = require("http-errors");
const { Schema } = mongoose;

const identitySchema = new Schema(
    {
        email: String,
        password: String,
    },
    {
        timestamps: true,
        versionKey: false,
        emitIndexErrors: true,
    }
);

var handleE11000 = function (error, res, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        throw createError(400, error.message);
    } else {
        next();
    }
};

identitySchema.post("save", handleE11000);
identitySchema.post("update", handleE11000);
identitySchema.post("findOneAndUpdate", handleE11000);
identitySchema.post("insertMany", handleE11000);

module.exports = mongoose.model("identity", identitySchema);
