'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('chain', {
      url: '/chain',
      template: '<chain></chain>'
    })
}
