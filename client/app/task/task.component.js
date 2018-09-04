'use strict';
const angular = require('angular');

import uiRouter from 'angular-ui-router';

import routes from './task.routes';

export class TaskComponent {
  /*@ngInject*/
  constructor() {
    this.fields = [
      {field: 'image',dataType: 'image'},
      {field: 'name', heading: 'Title'},
      {field: 'category', dataType: 'select', options: ['Shopping', 'Promotions', 'SEO', 'Developments']},
      {field: 'active', title: 'Complete', dataType: 'boolean'}
    ];
  }
}

export default angular.module('materialCrudSqlApp.task', [uiRouter])
  .config(routes)
  .component('task', {
    template: require('./task.html'),
    controller: TaskComponent
  })
  .name;
