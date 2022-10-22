const bcrypt = require('bcrypt');
const saltRounds = 10;
function hashSync(password) {
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

function compareSync(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports={
    hashSync,
    compareSync
}