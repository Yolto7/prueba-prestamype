const createError = require("http-errors");

class ExchangeRateService {
    constructor(ExchangeRateRepository, conversionRateProxy) {
        this._exchangeRateRepository = ExchangeRateRepository;
        this._conversionRateProxy = conversionRateProxy;
    }

    async exchangerate(body, userId) {
        this.validateRequest(body);
        let conversionRateresult = await this._conversionRateProxy.conversionRate();
        let amountToReceive = null;
        switch (body.exchangeRate) {
            case "purchase":
                amountToReceive = body.amount * conversionRateresult.purchase_price
                break;
            case "sale":
                amountToReceive = body.amount / conversionRateresult.sale_price
                break;
            default:
                throw createError(422, "PM-ERR-004");
        }

        return this._exchangeRateRepository.saveRequestExchangeRate(body, conversionRateresult, amountToReceive, userId);
    }

    async getRequestById(reqeustId) {
        return this._exchangeRateRepository.getRequestById(reqeustId);
    }

    async deleteRequest(reqeustId) {
        return this._exchangeRateRepository.deleteRequest(reqeustId);
    }

    async getAllByUser(userId) {
        return this._exchangeRateRepository.getAllByUser(userId);
    }

    async validateRequest(body) {
        if (!body.exchangeRate) {
            throw createError(422, "PM-ERR-002");
        }

        if (!body.amount) {
            throw createError(422, "PM-ERR-003");
        }
    }
}

module.exports = ExchangeRateService;
