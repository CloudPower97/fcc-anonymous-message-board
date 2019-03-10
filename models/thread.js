const bcrypt = require('bcrypt')
const comparePassword = require('../libs/utils')

const { SALT_ROUNDS } = process.env
;('use strict')
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define(
    'Thread',
    {
      text: { type: DataTypes.STRING, allowNull: false },
      delete_password: { type: DataTypes.STRING, allowNull: false },
      reported: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    {}
  )
  Thread.associate = function(models) {
    // associations can be defined here
    Thread.hasMany(models.Reply)
    Thread.belongsTo(models.Board)
  }

  Thread.beforeCreate(thread => {
    console.log(comparePassword)

    return bcrypt
      .hash(thread.delete_password, +SALT_ROUNDS)
      .then(hash => {
        thread.delete_password = hash
      })
      .catch(err => {
        throw new Error()
      })
  })

  Thread.prototype.comparePassword = comparePassword

  return Thread
}
