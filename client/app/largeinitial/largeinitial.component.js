'use strict';

import routes from './largeinitial.routes';

class LargeinitialComponent {
  constructor($state) {
    'ngInject';
    this.fields = [
      {field: 'notes', heading: 'Notes', dataType: 'text'},
      {field: 'available', title: 'Available', dataType: 'boolean'},
      {field: 'image', title: 'Thumbnail', dataType: 'image'},
      {field: 'price', title: 'Price', dataType: 'price'}
    ];
    this.name = 'Large Initial';
    window.document.title = this.name+'s';
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
