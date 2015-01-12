'use strict';

angular.module('todo.StateProvider',[
	'ionic',
	'todo.controllers'
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('todo', {
			url:'/todo',
			abstract: true,
			template: '<ui-view/>',
			templateUrl: 'index.html',
			controller: 'ProjectsCtrl'
		})
		.state('todo.projectTasks', {
			url: '/projectTasks/{$scope.activeProject.title}',
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
			url: '/{$scope.activeProject.title}/{getTaskID($scope.activeProject.activeTask)}',
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
})
