'use strict';

import modal from '../modal/modal.service';
import filters from '../filters/filters.filter';
import crudDetail from './detail.component';
import crudShowDetail from './showdetail.component';
import exportButton from '../export-data/export-data.component';
import listImage from '../list-image/';
import ngInfiniteScroll from 'ng-infinite-scroll';

class CrudListController {

  constructor($scope, socket, $state, $mdDialog, $stateParams, Modal, Toast, $http, $filter, appConfig, Auth) {
    /*@ngInject*/
    var vm = this;
    vm.$mdDialog = $mdDialog;
    vm.$stateParams = $stateParams;
    vm.$http = $http;
    vm.$filter = $filter;
    vm.$state = $state;
    vm.Modal = Modal;
    vm.Toast = Toast;
    vm.socket = socket;
    vm.appConfig = appConfig;
    vm.Auth = Auth;
    vm.l = 10;
    vm.sort = { predicate: vm.sort, reverse: false };
    vm.Auth.getCurrentUserSync().$promise.then((user) => { vm.user = user; });
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates(vm.api);
    });
  }

  $onInit() {
    var vm = this;
    vm.loading = true;
    var columns = localStorage !== null ? localStorage.columns : null;
    vm.cols = JSON.parse(columns);

    var api = localStorage !== null ? localStorage.api : null;
    vm.header = vm.api = api;

    var path = localStorage !== null ? localStorage.path : null;
    vm.header = vm.path = path;

    vm.api2 = vm.$filter('pluralize')(vm.api);
    vm.$http.get('/api/' + vm.api2).then(function (res) {
      vm.loading = false;
      vm.data = res.data;
      vm.socket.syncUpdates(vm.api, vm.data);
    }, function (err) {
      vm.handleError(err, vm)
    });


  }
  loadMore() {
    this.l = this.l + 10;
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
            <img ng-src="{{$ctrl.img.path}}" draggable="false" alt="{{$ctrl.img.media.name}}" class="detail-image"/>
          </div>
          <div>
            <ul>
              <li><strong>Image Name:</strong> {{$ctrl.img.media.name}}</li>
              <li><strong>Image Size:</strong> {{$ctrl.img.media.size}}</li>
              <li><strong>Image type:</strong> {{$ctrl.img.media.type}}</li>
              <li><strong>Image path:</strong> {{$ctrl.img.media.path}}</li>
              <li><strong>Date Uploaded:</strong> {{$ctrl.img.media.created_at}}</li>
              <li><strong>Uploader Email:</strong> {{$ctrl.img.media.user.email}}</li>
            </ul>
          </div>
        </div>
      </div>
  </md-dialog-content>
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

  create() {
    var vm = this;
    vm.Modal.create(vm.cols, { api: vm.api, name: vm.name });
    if (vm.$state.current.name !== vm.api) {
      vm.$state.go(vm.api)
    }
  }
  order(predicate) {
    this.sort.reverse = (this.sort.predicate === predicate) ? !this.sort.reverse : false;
    this.sort.predicate = predicate;
  };
  changeStatus(x) {
    var vm = this;
    vm.$http.patch('/api/' + vm.api2 + '/' + x._id, x).then(function () {
    }, function (err) {
      vm.handleError(err, vm)
    });
  };
  copy(data) {
    var vm = this;
    let text = vm.name ? vm.name : vm.api;
    var confirm = vm.$mdDialog.confirm()
      .title('Would you like to copy the ' + text + '?')
      .ariaLabel('Confirm to copy ' + text)
      .ok('Yes')
      .cancel('No')
    vm.$mdDialog.show(confirm).then(function () {
      var d = angular.copy(data);
      delete d._id;
      vm.$http.post('/api/' + vm.api2, d)
        .then(function (response) {
          let text = vm.name ? vm.name : vm.api;
          vm.Toast.show({ type: 'success', text: 'The ' + text + ' copied successfully.' });
        })
        .catch(function (err) {
          if (err.type === 'demo') return
          let text = vm.name ? vm.name : vm.api;
          vm.Toast.show({ type: 'warn', text: 'Error while duplicating ' + text });
        });
    })
  };

  delete(data) {
    var vm = this;
    let text = vm.name ? vm.name : vm.api;
    var confirm = vm.$mdDialog.confirm()
      .title('Would you like to delete the ' + text + '?')
      .ariaLabel('Confirm delete ' + text)
      .ok('Yes')
      .cancel('No')
    vm.$mdDialog.show(confirm).then(function () {
      vm.$http.delete('/api/' + vm.api2 + '/' + data._id).then(function () { },
        function (err) {
          vm.handleError(err, vm)
        });
    })
  }

  handleError(error, vm) { // error handler
    vm.loading = false;
    if (error.status === 401 || error.status === 403) {
      vm.Toast.show({ type: 'error', text: 'Not authorised to make changes.' });
    }
    else if (error.status === 404) {
      vm.Toast.show({ type: 'error', text: 'The requested resource not found.' });
    }
    else if (error.status !== 500 && error.type !== 'demo') {
      vm.Toast.show({ type: 'error', text: error.status });
    }
  }
}

export default angular.module('mcrud.crudList', [modal, filters, crudDetail, crudShowDetail, exportButton, ngInfiniteScroll, listImage])
  .component('crudList', {
    template: require('./list.html'),
    controller: CrudListController,
    controllerAs: 'list',
    bindings: { api: '<', path: '<', fields: '<', sort: '<', no: '<', name: '=' }
  })
  .name;