const awilix = require('awilix');
const ExchangeRateRepository = require("./services/repositories/exchangerate.repository");
const ExchangeRate = require("./services/repositories/models/exchangerate");
const config = require("./config");

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.CLASSIC,
});

function setup() {
  var result = {};
  
  setModels(result);
  setRespositories(result);
  setProxies(result);

  container.register(result);
}

function setModels(result) {
  result.ExchangeRate = awilix.asValue(ExchangeRate);
}

function setRespositories(result) {
  result.ExchangeRateRepository = awilix.asClass(ExchangeRateRepository).scoped();
}

function setProxies(result) {
  const ConversionRateProxy = require("./services/proxies/conversion-rate.proxy");

  const endpoints = {
    conversionRate: config.PRESTAMYPE_URLBASE
  };

  result.proxyEndpoints = awilix.asValue(endpoints);
  result.conversionRateProxy = awilix.asClass(ConversionRateProxy).transient();
}

module.exports = {
  container,
  setup,
};
