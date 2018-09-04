'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('media', {
      url: '/media',
      template: '<media></media>',
      authenticate: true,
      title: 'Media Manager'
    });
}
