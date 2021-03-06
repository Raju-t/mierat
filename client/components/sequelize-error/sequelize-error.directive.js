'use strict';

import angular from 'angular';

/**
 * Removes server error when user updates input
 */
export default angular.module('materialCrudSqlApp.sequelizeError', [])
  .directive('sequelizeError', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link(scope, element, attrs, ngModel) {
        element.on('keydown', () => ngModel.$setValidity('sequelize', true));
      }
    };
  }).name;
