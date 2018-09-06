'use strict';

import routes from './smallinitial.routes';

class SmallinitialComponent {
  constructor($state) {
    'ngInject';
    this.fields = [
      {field: 'notes', heading: 'Notes', dataType: 'text'},
      {field: 'available', title: 'Available', dataType: 'boolean'}
    ];
  }
}

export default angular.module('materialCrudSqlApp.smallinitial', [])
  .config(routes)
  .component('smallinitial', {
    template: require('./smallinitial.html'),
    controller: SmallinitialComponent,
    bindings: { }
  })
  .name