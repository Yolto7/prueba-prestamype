const BaseRepository = require("./base.repository");
const Utils = require("../../common/util");
const createError = require("http-errors");

class ExchangeRateRepository extends BaseRepository {
    constructor(ExchangeRate) {
        super(ExchangeRate);
        this._exchangerate = ExchangeRate;
    }

    async saveRequestExchangeRate(body, conversionRateresult, amountToReceive, userId) {
        let request = {
            exchangeRate: body.exchangeRate,
            conversionRate: {
                _id: conversionRateresult._id,
                purchase_price: conversionRateresult.purchase_price,
                sale_price: conversionRateresult.sale_price
            },
            amountToSend: body.amount,
            amountToReceive: amountToReceive,
            userId: userId,
            isDelete: false
        };

        return await this._exchangerate.create(request);
    }

    async getRequestById(reqeustId) {
        return await this.get(reqeustId);
    }

    async deleteRequest(reqeustId) {
        let request = await this.get(reqeustId);
        request.isDelete = true;
        await this.update(reqeustId, request);
        return true;
    }

    async getAllByUser(userId) {
        var result = await this._exchangerate
            .find({ "userId": userId, "isDelete": false })
            .exec();
        if (!result || result.length == 0) {
            return null;
        }
        return result;
    }


}

module.exports = ExchangeRateRepository;
