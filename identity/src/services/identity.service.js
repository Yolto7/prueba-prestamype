const createError = require("http-errors");
const { generateToken } = require("../common/jwt.util");
const { compareSync, hashSync } = require("../common/bcrypt.util")

class IdentityService {
    constructor(IdentityRepository) {
        this._identityRepository = IdentityRepository;
    }

    async register(body) {
        let exists = await this.validateExists(body.email);
        if (exists) {
            throw createError(422, "PM-ERR-002");
        }

        if (!body.password) {
            throw createError(422, "PM-ERR-003");
        }

        let passwordHash = hashSync(body.password);
        body.password = passwordHash;
        return this._identityRepository.register(body);
    }

    async login(body) {
        if (!body.email) {
            throw createError(422, "PM-ERR-004");
        }

        if (!body.password) {
            throw createError(422, "PM-ERR-003");
        }

        let userIdentity = await this._identityRepository.getIdentityByEmail(body.email);

        if (!userIdentity) {
            throw createError(422, "PM-ERR-006");
        }

        let identityId = userIdentity[0]._doc._id.toString();
        let identityPassword = userIdentity[0]._doc.password;
        let token = null

        let comparatePasswordResult = compareSync(body.password, identityPassword);
        if (comparatePasswordResult) {
            token = generateToken(identityId, identityId)
        } else {
            throw createError(422, "PM-ERR-006");
        }

        return { token };
    }

    async validateExists(email) {
        let exists = await this._identityRepository.getIdentityByEmail(email);
        return !!exists;
    }
}

module.exports = IdentityService;
