'use strict';

import routes from './center.routes';

class BookComponent {
  constructor($state) {
    'ngInject';
    this.fields = [
      {field: 'stone_type', heading: 'Stone Type', dataType: 'text'},
      {field: 'color', heading: 'Color', dataType: 'text'},
      {field: 'diamond_type', heading: 'Diamond Type', dataType: 'text'},
      {field: 'stone_ct_weight', heading: 'Stone CT Weight', dataType: 'number'},
      {field: 'stone_kt_weight', heading: 'Stone KT Weight', dataType: 'number'},
      {field: 'notes', heading: 'Notes', dataType: 'number'},
      {field: 'available', heading: 'Available', dataType: 'boolean'},
    ];
  }
}

export default angular.module('materialCrudSqlApp.center', [])
  .config(routes)
  .component('center', {
    template: require('./center.html'),
    controller: CenterComponent,
    bindings: { }
  })
  .name