const bcrypt = require('bcrypt')
const helpers = {}

helpers.encryPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

helpers.matchParssword = async (password, savedPassword) => {
    await bcrypt.compare(password, savedPassword)
}

module.exports = helpers