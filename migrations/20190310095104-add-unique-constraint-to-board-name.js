'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Boards', ['name'], {
      type: 'unique',
      options: {
        name: 'UQ_Board_Name',
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Boards', 'name', {
      type: 'unique',
      options: {
        name: 'UQ_Board_Name',
      },
    })
  },
}
