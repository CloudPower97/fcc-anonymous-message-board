'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Threads', 'BoardId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Boards',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Threads', 'BoardId')
  },
}
