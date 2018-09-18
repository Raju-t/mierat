'use strict';
const angular = require('angular');

import uiRouter from 'angular-ui-router';

import routes from './main.routes';

export class MainComponent {
  /*@ngInject*/
  constructor(appConfig, Auth, $http) {
    let vm = this;
    this.pages = [];
    this.pages = appConfig.menu.pages;
    this.$http = $http;
    if(Auth.getCurrentUserSync().$promise){
      Auth.getCurrentUserSync().$promise.then((user) => {
      this.user = user; 
      if(this.user.profile.role == 'user' || !this.user || !this.user.profile){
      vm.$http.get('/api/media/public_images').then(function (res) {
        vm.loading = false;
        vm.data = res.data;
      }, function (err) {
        vm.handleError(err, vm)
      });
      }
     });  
    } else {
      vm.$http.get('/api/media/public_images').then(function (res) {
        vm.loading = false;
        vm.data = res.data;
      }, function (err) {
        vm.handleError(err, vm)
      });
    }
    
  }
  getColor($index) {
    var _d = ($index + 1) % 11;
    var bg = '';

    switch (_d) {
      case 1: bg = 'red'; break;
      case 2: bg = 'green'; break;
      case 3: bg = 'darkBlue'; break;
      case 4: bg = 'blue'; break;
      case 5: bg = 'yellow'; break;
      case 6: bg = 'pink'; break;
      case 7: bg = 'darkBlue'; break;
      case 8: bg = 'purple'; break;
      case 9: bg = 'deepBlue'; break;
      case 10: bg = 'lightPurple'; break;
      default: bg = 'yellow'; break;
    }

    return bg;
  }
}

export default angular.module('materialCrudSqlApp.main', [uiRouter])
  .config(routes)
  .run(function($rootScope, $cookies, $location, $state){
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      if(!$cookies.get('token') && next!=window.location.origin+"/"){
        $location.path('/login');
      }
    });
  })
  .component('main', {
    template: require('./main.html'),
    controller: MainComponent
  })
  .name;
