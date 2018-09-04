'use strict';

import angular from 'angular';
import SignupController from './signup.controller';

export default angular.module('crudSqlApp.signup', [])
  .controller('SignupController', SignupController)
  .name;
