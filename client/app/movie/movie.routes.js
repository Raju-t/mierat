'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('movie', {
      url: '/movie',
      template: '<movie></movie>',
      authenticate: true,
      title:'Trending Movies'
    });
}
