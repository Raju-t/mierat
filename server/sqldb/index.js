/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Media = db.sequelize.import('../api/media/media.model');
db.Movie = db.sequelize.import('../api/movie/movie.model');
db.Book = db.sequelize.import('../api/book/book.model');
db.Customer = db.sequelize.import('../api/customer/customer.model');
db.Contact = db.sequelize.import('../api/contact/contact.model');
db.Task = db.sequelize.import('../api/task/task.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Charm = db.sequelize.import('../api/charm/charm.model');
db.Chain = db.sequelize.import('../api/chain/chain.model');
db.Center = db.sequelize.import('../api/center/center.model');
db.Largeinitial = db.sequelize.import('../api/largeinitial/largeinitial.model');
db.Smallinitial = db.sequelize.import('../api/smallinitial/smallinitial.model');

db.Media.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });

db.Charm.belongsTo(db.Media, { foreignKey: 'image_id', as: 'media'});
db.Chain.belongsTo(db.Media, { foreignKey: 'image_id', as: 'media'});
db.Center.belongsTo(db.Media, { foreignKey: 'image_id', as: 'media'});
db.Largeinitial.belongsTo(db.Media, { foreignKey: 'image_id', as: 'media'});
db.Smallinitial.belongsTo(db.Media, { foreignKey: 'image_id', as: 'media'});

db.Charm.belongsTo(db.User, { foreignKey: 'lastModifiedBy', as: 'modifiedByUser'});
db.Chain.belongsTo(db.User, { foreignKey: 'lastModifiedBy', as: 'modifiedByUser'});
db.Center.belongsTo(db.User, { foreignKey: 'lastModifiedBy', as: 'modifiedByUser'});
db.Largeinitial.belongsTo(db.User, { foreignKey: 'lastModifiedBy', as: 'modifiedByUser'});
db.Smallinitial.belongsTo(db.User, { foreignKey: 'lastModifiedBy', as: 'modifiedByUser'});

module.exports = db;
