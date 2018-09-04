'use strict';

export function routerDecorator($rootScope, $state, $location, Auth, LoginModal, Toast) {
  'ngInject';

  // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
  $rootScope.$on('$stateChangeStart', function (event, next) {
    if (!next.authenticate) { // If it is a public route
      return;
    }

    // Routes that require specific roles
    if (typeof next.authenticate === 'string') {
      Auth.hasRoleAsync(next.authenticate, function (is) {
        if (!is) {
          event.preventDefault();
          LoginModal.show(next.name);
          Toast.show({ type: 'error', text: 'You do not have priviledge to access the requested page' });
        }
      });
    } else {
      // Routes that require only authentication without any specific roles
      Auth.isLoggedInAsync(function (is) {
        if (!is) {
          event.preventDefault();
          LoginModal.show(next.name);
        }
      });
    }
  })
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // this is required if you want to prevent the $UrlRouter reverting the URL to the previous valid location
    Toast.show({ type: 'error', text: 'The requested page has some error' });
    return $location.path(fromState, fromParams);
  });
}