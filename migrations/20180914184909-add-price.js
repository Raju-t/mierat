'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('Centers', 'price', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    })
    .then( () => {
      return queryInterface.addColumn('Chains', 'price', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      })
    })
    .then( () => {
      return queryInterface.addColumn('Charms', 'price', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      })
    })
    .then( () => {
      return queryInterface.addColumn('Largeinitials', 'price', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      })
    })
    .then( () => {
      return queryInterface.addColumn('Smallinitials', 'price', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      })
    })
    .then(() => { console.log("modifiedByUser added to Chain, Charm, Center, Large Initial and Small Initial.")})
    .catch((error) => { console.log(error)});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.removeColumn('centers', 'price'),
      queryInterface.removeColumn('chains', 'price'),
      queryInterface.removeColumn('charms', 'price'),
      queryInterface.removeColumn('largeinitials', 'price'),
      queryInterface.removeColumn('smallinitials', 'price')
    ])
    .then(() => { console.log("modifiedByUser added to Chain, Charm, Center, Large Initial and Small Initial.")});
  }
};
