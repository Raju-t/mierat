'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('customer', {
      url: '/customer',
      template: '<customer></customer>',
      authenticate: true,
      title:'All Customers of CRUD Table'
    });
}
