// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'LocalStorageModule'])

// It is good practice to add a prefix to our stored entities to avoid being overwritten in the future
app.config(function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('sek-starter');
});

//Add controller
app.controller('main', 
	function($scope, $ionicModal, localStorageService) {
		//initialize variables
		var taskData = "task";
		$scope.tasks = [];
		$scope.task = {};
		
		//configure the ionic modal dialog
		$ionicModal.fromTemplateUrl('new-task-modal.html', {
				scope: $scope,
				animation: 'slide-in-up'})
			.then(function (modal) {
				$scope.newTaskModal = modal;
			});
		
		$scope.openTaskModal = function() {
			$scope.newTaskModal.show();
		}
		$scope.closeTaskModal = function() {
			$scope.newTaskModal.hide();
		}
		
		$scope.getTasks = function() {
			// If there's anything saved in the local storage, grab it
			// otherwise, send an empty list
			if (localStorageService.get(taskData)) {
				$scope.tasks = localStorageService.get(taskData);
			} else {
				$scope.tasks = [];
			}
		}
		$scope.createTask = function() {
			// create a new tasks
			$scope.tasks.push($scope.task);
			// Save it to local storage
			localStorageService.set(taskData, $scope.tasks);
			// Close the dialog and cleanup
			$scope.tasks = {};
			$scope.newTaskModal.hide();
		}
		$scope.removeTask = function(index) {
			//remove the index task
			$scope.tasks.splice(index, 1);
			// update the local storage
			localStorageService.set(tasksData, $scope.tasks);
		}
		$scope.completeTask = function(index) {
			if (index > 0) {
				$scope.tasks[index].completed = true;
			}
			// update the local storage
			localStorageService.set(tasksData, $scope.tasks);
		}
	});
	

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
