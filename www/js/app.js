'use strict';

angular.module("todo", [
  'ionic', 
  'todo.controllers',
  'todo.services'
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('todo', {
			url:'/todo',
			abstract: true,
			templateUrl: 'index.html',
			controller: 'ProjectsCtrl'
		})
		.state('todo.projectTasks', {
			url: '/projectTasks',
			views: {
			'': {
				templateUrl: 'template/projectsTasks.html',
				controller: 'ProjectsCtrl'
				}
			}
		})
		.state('todo.newProject', {
			abstract: true,
			url: '/create-new-project',
			views: {
			'': {
				templateUrl: 'templates/create-new-project.html',
				controller: 'ProjectsCtrl'
				}
			}
		})
		.state('todo.createNewTask', {
			url: '/{$scope.activeProject}/{getTaskID($scope.activeProject.activeTask)}',
			abstract: true,
			views: {
				'': {
					templateUrl: 'templates/task-modal.html',
					controller: 'TaskCtrl'
				}
			}
		})
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('todo');
});
