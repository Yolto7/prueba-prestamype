const axios = require('axios');

class ConversionRateProxy {
    constructor(proxyEndpoints) {
        this.client = axios.create({ baseURL: proxyEndpoints.conversionRate });
    }

    async conversionRate() {
        const result = await this.client.get(`/config/rates`);
        return result.data.data;
    }
}

module.exports = ConversionRateProxy;