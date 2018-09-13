'use strict';

import routes from './login.routes';

class LoginComponent {
  constructor($state, Auth, $cookies) {
    'ngInject';
    this.Auth = Auth;
    this.user = {
      email: '',
      password: ''
    };
    this.errors = {
      other: ''
    };
    this.$state = $state;
    if($cookies.get('token')){
      this.$state.go('/');
    }
  }
  
  login(form) {
      this.submitted = true;
      if (form.$valid) {
          this.loading = true;
          this.Auth.login({
              email: this.user.email,
              password: this.user.password
          })
              .then(() => {
                  this.loading = false;
                  this.$state.go('/');   
              })
              .catch(err => {
                  this.errors.other = err.message;
                  this.loading = false;
              });
      }
  } 
}

export default angular.module('materialCrudSqlApp.login', [])
  .config(routes)
  .component('login', {
    template: require('./login.html'),
    controller: LoginComponent,
    bindings: { }
  })
  .name