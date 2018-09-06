'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('charm', {
      url: '/charm',
      template: '<charm></charm>'
    })
}
