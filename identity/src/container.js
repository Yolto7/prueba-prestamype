//const awilix = require("awilix");
const awilix = require('awilix');
const IdentityRepository = require("./services/repositories/identity.repository");
const Identity = require("./services/repositories/models/Identity");
const config = require("./config");

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.CLASSIC,
});

function setup() {
  var result = {};
  setModels(result);
  setRespositories(result);

  container.register(result);
}

function setModels(result) {
  result.Identity = awilix.asValue(Identity);
}

function setRespositories(result) {
  result.IdentityRepository = awilix.asClass(IdentityRepository).scoped();
}

module.exports = {
  container,
  setup,
};
