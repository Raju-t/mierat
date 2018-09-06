'use strict';

import routes from './chain.routes';

class ChainComponent  {
  constructor($state) {
    'ngInject';
    this.fields = [
      {field: 'color', heading: 'Color(Rose,Yellow, White)', dataType: 'text'},
      {field: 'notes', heading: 'Notes', dataType: 'text'},
      {field: 'available', title: 'Available', dataType: 'boolean'}
    ];
  }
}

export default angular.module('materialCrudSqlApp.chain', [])
  .config(routes)
  .component('chain', {
    template: require('./chain.html'),
    controller: ChainComponent,
    bindings: { }
  })
  .name