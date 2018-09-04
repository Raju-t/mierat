'use strict';

import ngResource from 'angular-resource';

export default angular.module('materialCrudSqlApp.factory', [ngResource])
  .factory('Book', function ($resource) {
    var obj = {};
    obj = $resource('/api/books/:id', null, { 'update': { method: 'PUT' } });
    return obj;
  })
  .factory('Mail', function ($resource) {
    return $resource('/api/sendmail/:id');
  })
  .name;