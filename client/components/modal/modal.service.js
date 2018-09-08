'use strict';

import filters from '../filters/filters.filter';

export default angular
	.module('materialCrudSqlApp.modal', [filters])
	.factory('Modal', Modal)
	.controller('ModalController', ModalController)
	.name;

function Modal($mdDialog, $state) {
	'ngInject';
	var obj = {};
	obj.create = function (cols, options) {
		return $mdDialog.show({
			controller: 'ModalController as create',
			template: require('./create.html'),
			clickOutsideToClose: false,
			locals: { cols: cols, options: options }
		}).then(transitionTo, transitionTo);
	};
	obj.media = function () {
		return $mdDialog.show({
			fullscreen: true,
			template: require('./../media-modal/popup.html'),
			controller: MediaController
		}).then(transitionTo, transitionTo);
	};

	return obj;
}

function transitionTo(answer) {
	return answer;
}

function MediaController($scope, $mdDialog, $http, socket, $state) {
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
	}
}

function ModalController($mdDialog, Toast, $http, options, cols, appConfig, $filter) {
	var vm = this;
	vm.create = createUser;
	vm.close = hideDialog;
	vm.cancel = cancelDialog;
	vm.options = options;
	vm.options.columns = cols;
	vm.title = options.api;
	vm.name = options.name;
	function createUser(form) {
		if (!vm.item) {
			Toast.show({ type: 'success', text: options.api + ' information insufficient.' });
			return;
		}
		if (vm.item._id || (form && !form.$valid)) {
			return;
		}

		$http.post('/api/' + $filter('pluralize')(options.api), vm.item)
			.then(createUserSuccess)
			.catch(createUserCatch);
		function createUserSuccess(response) {
			var item = vm.item = response.data;
			var text = options.name ? options.name : options.api;
			Toast.show({ type: 'success', text: 'New ' + text + ' saved successfully.' });
			vm.close();
		}

		function createUserCatch(err) {
			Toast.show({ type: 'warn', text: 'Error while creating new ' + options.api });
		}
	}

	function hideDialog() {
		$mdDialog.hide();
	}

	function cancelDialog() {
		$mdDialog.cancel();
	}
}
