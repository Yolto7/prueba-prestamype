const { createController } = require("awilix-express");
const { responseOk } = require("../common/response");
const { schemaRegister } = require("./validateRequest/register.validate")
const { authenticateJWT } = require("../auth/auth.middleware")
const Joi = require('joi');

class ExchagerateController {
    constructor(exchangerateService) {
        this._exchangerateService = exchangerateService;
    }

    async exchangerate(req, res) {

        // try {
        //     //const value =  await this.schemaRegister.validateAsync(req.body);
        //     let result = Joi.validate(req.body, schemaRegister);
        // }
        // catch (err) {
        //     throw new Error(err.message);
        // }
        let result = await this._exchangerateService.exchangerate(req.body, req.userId);
        responseOk(res, result, "PM-OK-001");
    }

    async getRequestById(req, res) {
        let requestId = req.params.id;
        let result = await this._exchangerateService.getRequestById(requestId);
        responseOk(res, result, "PM-OK-001");
    }

    async deleteRequest(req, res) {
        let requestId = req.params.id;
        let result = await this._exchangerateService.deleteRequest(requestId);
        responseOk(res, result, "PM-OK-001");
    }

    async getAllByUser(req, res) {
        let result = await this._exchangerateService.getAllByUser(req.userId);
        responseOk(res, result, "PM-OK-001");
    }

}

module.exports = createController(ExchagerateController)
    .prefix("/exchangerate")
    .post("/request", "exchangerate", { before: [authenticateJWT()], })
    .get("/request/:id", "getRequestById", { before: [authenticateJWT()], })
    .delete("/request/:id", "deleteRequest", { before: [authenticateJWT()], })
    .get("/list", "getAllByUser", { before: [authenticateJWT()], });
