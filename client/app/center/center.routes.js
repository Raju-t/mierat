'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('center', {
      url: '/center',
      template: '<center></center>'
    })
}
