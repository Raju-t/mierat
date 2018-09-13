'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('Centers', 'lastModifiedBy', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
    .then( () => {
      return queryInterface.addColumn('Chains', 'lastModifiedBy', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    })
    .then( () => {
      return queryInterface.addColumn('Charms', 'lastModifiedBy', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    })
    .then( () => {
      return queryInterface.addColumn('Largeinitials', 'lastModifiedBy', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    })
    .then( () => {
      return queryInterface.addColumn('Smallinitials', 'lastModifiedBy', {
        type: Sequelize.INTEGER,
        allowNull: true
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
      queryInterface.removeColumn('centers', 'lastModifiedBy'),
      queryInterface.removeColumn('chains', 'lastModifiedBy'),
      queryInterface.removeColumn('charms', 'lastModifiedBy'),
      queryInterface.removeColumn('largeinitials', 'lastModifiedBy'),
      queryInterface.removeColumn('smallinitials', 'lastModifiedBy')
    ])
    .then(() => { console.log("modifiedByUser added to Chain, Charm, Center, Large Initial and Small Initial.")});
  }
};
