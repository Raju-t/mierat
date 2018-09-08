'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('/', {
      url: '/',
      template: '<main></main>',
      title:'Meira T Design'
    });
}
