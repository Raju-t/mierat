/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/media', require('./api/media'));
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/movies', require('./api/movie'));
  app.use('/api/contacts', require('./api/contact'));
  app.use('/api/tasks', require('./api/task'));
  app.use('/api/books', require('./api/book'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/sendmail', require('./api/sendmail'));
  app.use('/api/charms', require('./api/charm'));
  app.use('/api/chains', require('./api/chain'));
  app.use('/api/centers', require('./api/center'));
  app.use('/api/largeinitials', require('./api/largeinitial'));
  app.use('/api/smallinitials', require('./api/smallinitial'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
