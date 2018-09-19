'use strict';

import routes from './charm.routes';

class CharmComponent {
  constructor($state) {
    'ngInject';
    this.fields = [
      {field: 'stone_type', heading: 'Stone Type', dataType: 'text'},
      {field: 'color', title: 'Color', dataType: 'text'},
      {field: 'diamond_type', title: 'Diamond Type', dataType: 'text'},
      {field: 'stone_c_weight', title: 'Stone C Weight', dataType: 'number'},
      {field: 'stone_k_weight', title: 'Stone K Weight', dataType: 'number'},
      {field: 'notes', title: 'Notes', dataType: 'text'},
      {field: 'available', title: 'Available', dataType: 'boolean'},
      {field: 'image', title: 'Thumbnail', dataType: 'image'},
      {field: 'price', title: 'Price', dataType: 'price'}
    ];
  }
}

export default angular.module('materialCrudSqlApp.charm', [])
  .config(routes)
  .component('charm', {
    template: require('./charm.html'),
    controller: CharmComponent,
    bindings: { }
  })
  .name
