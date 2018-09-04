'use strict';
const angular = require('angular');

import uiRouter from 'angular-ui-router';

import routes from './movie.routes';

export class MovieComponent {
  /*@ngInject*/
  constructor() {
    this.fields = [
      {field: 'image', title: 'Poster', dataType: 'image'},
      {field: 'name', heading: 'Title', noEdit: true},
      {field: 'production'},
      {field: 'rating', dataType: 'number'},
      {field: 'genre', dataType: 'select', options: ['Action', 'Comedy', 'Drama', 'Romance', 'SiFi', 'Thriller'], noSort: true},
      {field: 'language', dataType: 'select', options: ['English', 'Hindi', 'French']},
      {field: 'releaseDate', dataType: 'date'},
      {field: 'active', heading: 'Status', dataType: 'boolean'}
    ];
  }
}

export default angular.module('materialCrudSqlApp.movie', [uiRouter])
  .config(routes)
  .component('movie', {
    template: require('./movie.html'),
    controller: MovieComponent
  })
  .name;
