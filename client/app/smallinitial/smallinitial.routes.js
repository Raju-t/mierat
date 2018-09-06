'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('smallinitial', {
      url: '/smallinitial',
      template: '<smallinitial></smallinitial>'
    })
}
