'use strict'
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    'Board',
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {}
  )
  Board.associate = function(models) {
    // associations can be defined here
    Board.hasMany(models.Thread)
  }
  return Board
}
