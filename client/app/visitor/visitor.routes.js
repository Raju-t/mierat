'use strict';

export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('visitor', {
      url: '/visitor',
      template: '<visitor></visitor>',
      authenticate: true,
      title: 'All Visitors - Visitor Tracker'
    });
}
