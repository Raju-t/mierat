'use strict';

class MediaModal {
  /*@ngInject*/
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;
  }

  show(index) {
    var vm = this;
    vm.$mdDialog.show({
      fullscreen: true,
      template: require('./popup.html'),
      controller: function ($scope, $mdDialog, $http, socket, $state) {
        'ngInject';
        var vm = this
        $scope.loading = true;
        $http.get('/api/media/').then(function (res) {
          $scope.loading = false;
          $scope.media = res.data;
          socket.syncUpdates('media', $scope.data);
        }, handleError);

        function handleError(error) { // error handler
          $scope.loading = false;
          if (error.status === 403) {
            Toast.show({ type: 'error', text: 'Not authorised to make changes.' });
          }
          else {
            Toast.show({ type: 'error', text: error.status });
          }
        }
        $scope.ok = function (path) {
          $mdDialog.hide(path);
        }
        $scope.hide = function () {
          $mdDialog.hide();
        };
        $scope.cancel = function () {
          $mdDialog.cancel();
        };
        $scope.addNewImage = function () {
          $state.go('media');
          $scope.hide();
          vm.save(vm.product)
        }
      }
    });
  }
}