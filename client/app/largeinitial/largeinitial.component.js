'use strict';

import routes from './largeinitial.routes';

class LargeinitialComponent {
  constructor($state) {
    'ngInject';
    this.fields = [
      {field: 'notes', heading: 'Notes', dataType: 'text'},
      {field: 'available', title: 'Available', dataType: 'boolean'}
    ];
  }
}

export default angular.module('materialCrudSqlApp.largeinitial', [])
  .config(routes)
  .component('largeinitial', {
    template: require('./largeinitial.html'),
    controller: LargeinitialComponent,
    bindings: { }
  })
  .name