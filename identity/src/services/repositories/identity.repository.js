const BaseRepository = require("./base.repository");

class IdentityRepository extends BaseRepository {
    constructor(Identity) {
        super(Identity);
        this._identity = Identity;
    }

    async register(body) {
        return await this._identity.create(body);
    }

    async login(collectionId) {
        return this.login(collectionId);
    }

    async getIdentityByEmail(email) {
        var result = await this._identity
            .find({ "email": email })
            .exec();
        if (!result || result.length == 0) {
            return null;
        }
        return result;
    }
   
}

module.exports = IdentityRepository;
