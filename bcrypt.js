const bcrypt = require('bcryptjs')

function hash(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    return hash
}

function compare(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
}

module.exports = {hash, compare}