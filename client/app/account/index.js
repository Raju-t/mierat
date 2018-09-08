'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './account.routes';
import password from './password/password.controller';
import editProfile from './edit-profile/edit-profile.controller';
import oauthButtons from '../../components/oauth-buttons';

export default angular.module('materialCrudSqlApp.account', [uiRouter, oauthButtons, password, editProfile])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if(next.name == 'logout'){
        var d = new Date(); //Create an date object
        d.setTime(d.getTime() + (0*1000*60*60*24)); //Set the time to exdays from the current date in milliseconds. 1000 milliseonds = 1 second
        var expires = "expires=" + d.toGMTString(); 
        window.document.cookie = "token=";
        window.location.href = "/";
      }
      if(next.name === 'logout' && current && current.name && current.name != 'crud.detail' && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  })
  .name;
