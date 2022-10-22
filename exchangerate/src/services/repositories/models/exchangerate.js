const mongoose = require("mongoose");
const createError = require("http-errors");
const { Schema } = mongoose;

const conversionRate = new Schema({
    _id: String,
    purchase_price: Number,
    sale_price: Number
}, {
    _id: false,
    versionKey: false,
});

const exchangeRateSchema = new Schema(
    {
        exchangeRate: String,
        conversionRate: { type: conversionRate, default: null },
        amountToSend: Number,
        amountToReceive: Number,
        userId: String,
        isDelete: Boolean

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

exchangeRateSchema.post("save", handleE11000);
exchangeRateSchema.post("update", handleE11000);
exchangeRateSchema.post("findOneAndUpdate", handleE11000);
exchangeRateSchema.post("insertMany", handleE11000);

module.exports = mongoose.model("exchangerate", exchangeRateSchema);
