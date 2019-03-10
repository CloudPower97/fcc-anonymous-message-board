'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Replies', 'ThreadId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Threads',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Replies', 'ThreadId')
  },
}
