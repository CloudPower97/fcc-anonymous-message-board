const bcrypt = require('bcrypt')
const comparePassword = require('../libs/utils')

const { SALT_ROUNDS } = process.env

;('use strict')
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    'Reply',
    {
      text: { type: DataTypes.STRING, allowNull: false },
      delete_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reported: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    {}
  )
  Reply.associate = function(models) {
    // associations can be defined here
    Reply.belongsTo(models.Thread)
  }

  Reply.beforeCreate((reply, options) => {
    return bcrypt
      .hash(reply.delete_password, +SALT_ROUNDS)
      .then(hash => {
        reply.delete_password = hash
      })
      .catch(err => {
        throw new Error()
      })
  })

  Reply.prototype.comparePassword = comparePassword

  return Reply
}
