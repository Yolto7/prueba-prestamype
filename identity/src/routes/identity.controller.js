const { createController } = require("awilix-express");
const { responseOk, responseAppError } = require("../common/response");
const { schemaRegister } = require("./validateRequest/register.validate")
const Joi = require('joi');

class IdentityController {
    constructor(identityService) {
        this._identityService = identityService;
    }

    async register(req, res) {

        // try {
        //     //const value =  await this.schemaRegister.validateAsync(req.body);
        //     let result = Joi.validate(req.body, schemaRegister);
        // }
        // catch (err) {
        //     throw new Error(err.message);
        // }
        let result = await this._identityService.register(req.body);
        responseOk(res, result, "PM-OK-001");
    }

    async login(req, res) {
        let result = await this._identityService.login(req.body);
        responseOk(res, result, "PM-OK-001");
    }

}

module.exports = createController(IdentityController)
    .prefix("/identity")
    .post("/register", "register")
    .post("/login", "login");
