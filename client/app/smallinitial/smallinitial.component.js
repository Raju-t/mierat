'use strict';

import routes from './smallinitial.routes';

class SmallinitialComponent {
  constructor($state) {
    'ngInject';
    this.fields = [
      {field: 'notes', heading: 'Notes', dataType: 'text'},
      {field: 'available', title: 'Available', dataType: 'boolean'},
      {field: 'image', title: 'Thumbnail', dataType: 'image'},
      {field: 'price', title: 'Price', dataType: 'number'}
    ];
    this.name = 'Small Initial';
    window.document.title = this.name+'s';
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
