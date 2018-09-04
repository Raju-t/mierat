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

module.exports = db;
