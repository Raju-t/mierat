'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('task', {
      url: '/task',
      template: '<task></task>',
      authenticate: true
    });
}
