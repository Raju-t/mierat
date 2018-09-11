'use strict';

import routes from './media.routes';
import toast from './../../components/toast/toast.service';
import ngFileUpload from 'ng-file-upload';

export class MediaComponent {
  /*@ngInject*/
  constructor($scope, Upload, $timeout, $http, socket, $mdDialog, appConfig, Toast) {
    var vm = this;
    vm.$mdDialog = $mdDialog;
    vm.Upload = Upload;
    vm.$timeout = $timeout;
    vm.Toast = Toast;
    vm.appConfig = appConfig;
    vm.$http = $http;
    vm.log = '';
    // Start query the database for the table
    // $scope.loading = true;
    $http.get('/api/media/').then(function(res) {
      // $scope.loading = false;
      vm.data = res.data;
      socket.syncUpdates('media', vm.data);
    });
    $scope.$watch('files', function () {
        vm.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file];
        }
    });
  }

  imageDetails (img) {
  this.$mdDialog.show({
    template: `
    <md-dialog aria-label="Image Details Dialog">
  <md-toolbar>
    <div class="md-toolbar-tools">
      <h2>Media Details</h2>
      <span flex></span>
      <md-button class="md-icon-button" ng-click="$ctrl.cancel()">
        <ng-md-icon icon="close" aria-label="Close dialog"></ng-md-icon>
      </md-button>
    </div>
  </md-toolbar>
  <md-dialog-content>
    <div class="md-dialog-content">
      <div layout="row" class="md-whiteframe-z2">
        <div class="flexbox-container">
        	<div>
            <img ng-src="{{$ctrl.img.path}}" draggable="false" alt="{{$ctrl.img.name}}" class="detail-image"/>
          </div>
        	<div>
            <ul>
              <li><strong>Image Name:</strong> {{$ctrl.img.name}}</li>
              <li><strong>Image Size:</strong> {{$ctrl.img.size}}</li>
              <li><strong>Image type:</strong> {{$ctrl.img.type}}</li>
              <li><strong>Image path:</strong> {{$ctrl.img.path}}</li>
              <li><strong>Date Uploaded:</strong> {{$ctrl.img.name}}</li>
              <li><strong>Uploader Email:</strong> {{$ctrl.img.user.email}}</li>
            </ul>
        	</div>
        </div>
      </div>
  </md-dialog-content>
  <md-dialog-actions layout="row">
    <span flex></span>
    <md-button ng-click="$ctrl.delete($ctrl.img)" class="md-warn">
     Delete Permanently
    </md-button>
  </md-dialog-actions>
</md-dialog>
`,
    controller: function($scope, $mdDialog,$http) {
        'ngInject'
      
        var vm = this;
        vm.img = img;
        // vm.img = img;
        vm.delete = function(img){
          var confirm = $mdDialog.confirm()
            .title('Would you like to delete the media permanently?')
            .textContent('Media once deleted can not be undone.')
            .ariaLabel('Delete Media')
            .ok('Please do it!')
            .cancel('Cancel');
          $mdDialog.show(confirm).then(function() {
            $http.delete('/api/media/' + img._id).then(function() {
              $mdDialog.hide();
            },()=>{if(error.status === 403){
              vm.Toast.show({
                type: 'error',
                text: 'Not authorised to make changes.'
              });
            }
            else{
              vm.Toast.show({
                type: 'error',
                text: error.status
              });
            }});
          }, function() {
            $mdDialog.hide();
          });
        }
        vm.hide = function() {
            $mdDialog.hide();
        };
        vm.cancel = function() {
            $mdDialog.cancel();
        };
    },
    controllerAs: '$ctrl'
  }).then(function(answer) {
    // this.alert = 'You said the information was "' + answer + '".';
  }, function() {
    // this.alert = 'You cancelled the dialog.';
  });
  }

  // handleError(error) { // error handler
  //   var vm = this;
  //       // vm.loading = false;
  //       if(error.status === 403){
  //         vm.Toast.show({
  //           type: 'error',
  //           text: 'Not authorised to make changes.'
  //         });
  //       }
  //       else{
  //         vm.Toast.show({
  //           type: 'error',
  //           text: error.status
  //         });
  //       }
  //   }

    upload(files){
      var vm = this;
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                vm.Upload.upload({
                    url: 'api/media',
                    data: {
                      // username: vm.username,
                      file: file
                    }
                }).then(function (resp) {
                    vm.$timeout(function() {
                        vm.log = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + vm.log;
                        vm.result = resp.data;
                    });
                }, function (response) {
                    if (response.status > 0) {
                        vm.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
                    vm.log = 'progress: ' + progressPercentage +
                    	'% ' + evt.config.data.file.name + '\n' +
                      vm.log;
                    vm.progress =
                          Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
              }
            }
        }
    }
}

export default angular.module('materialCrudSqlApp.media', [ngFileUpload, toast])
  .config(routes)
  .component('media', {
    template: require('./media.html'),
    controller: MediaComponent
  })
  .name;
