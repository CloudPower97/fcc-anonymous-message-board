const bcrypt = require('bcrypt')

module.exports = function(password) {
  return bcrypt.compare(password, this.delete_password)
}
