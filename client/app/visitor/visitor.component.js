'use strict';
const angular = require('angular');

import uiRouter from 'angular-ui-router';

import routes from './visitor.routes';

export class CustomerComponent {
  /*@ngInject*/
  constructor() {
    this.fields = [
      { field: '_id', heading: 'ID' },
      { field: 'first_name', heading: 'First Name' },
      { field: 'last_name', heading: 'Last Name' },
      { field: 'time_of_entry', heading: 'Time of Entry', dataType: 'date' },
      { field: 'D1', heading: 'D1', dataType: 'boolean' },
      { field: 'D2', heading: 'D2', dataType: 'boolean' },
      { field: 'D3', heading: 'D3', dataType: 'boolean' },
      { field: 'notes', dataType: 'textarea' }
    ];
  }
}

export default angular.module('materialCrudSqlApp.visitor', [uiRouter])
  .config(routes)
  .component('visitor', {
    template: require('./visitor.html'),
    controller: CustomerComponent
  })
  .name;
