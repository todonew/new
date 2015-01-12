'use strict';

angular.module('todo.services', [])
.service('ProjectsService', ProjectsService)
.service('TaskService', TaskService)


function ProjectsService () {

    var data = [];
    this.all = function() {
        return data;
    };
    this.loadFromStorage = function () {
        var projectString = window.localStorage['projects'];
        data = projectString ? angular.fromJson(projectString) || [] : [];
        return data;
    };
    this.save = function(projects){
        window.localStorage['projects'] = angular.toJson(projects);
        data = projects;
    };
    this.newProject = function(projectTitle){
        return {
          title: projectTitle,
          tasks: []
        };
    };
    this.getLastActiveIndex = function() {
        return parseInt(window.localStorage['lastActiveProject']) || 0;
    };
    this.getLastActiveProject = function () {
        return this.all()[this.getLastActiveIndex()];
    };
    this.getIndexOfProject = function (project) {
        if (typeof project == 'undefined' || project == null) return -1;
        var obj = project;
        obj ? delete obj.$$hashKey : null;

        return data.indexOf(obj);
    };
    this.setActiveProject = function(project) {
        if (typeof project === 'undefined') return;
        window.localStorage['lastActiveProject']  = this.getIndexOfProject(project) || 0;
    };
    this.loadFromStorage();
}

TaskService.$inject = ["$scope"];
function TaskService($scope)  {
  $scope.saveTask = function (task) {
      if ($scope.getTaskID(task) > -1) $scope.editTask(task);
      else $scope.addNewTask(task);
    };
  $scope.addNewTask = function(task){
    if(!$scope.activeProject || !task){
       return;
    }
    $scope.activeProject.tasks.push({
      title: task.title,
      date: new Date(task.date) || new Date(),
      checked: false,
      comment: task.comment
    });

    $scope.closeNewTask();
    task.title = null;
    task.date= new Date();
    task.comment = null;
    task.checked = false;
  };
  
  $scope.editTask = function(task){
    console.log("active" + $scope.activeProject.activeTask.title);
    if (typeof activeTask === 'undefined') return;
    if(!$scope.activeProject.activeTask || !activeTask) return;
    var indexOf = $scope.activeProject.activeTask;

    $scope.activeProject.activeTask.title = task.title || $scope.activeProject.activeTask.title;
    $scope.activeProject.activeTask.date = task.date || $scope.activeProject.activeTask.date;
    $scope.activeProject.activeTask.comment = task.comment || $scope.activeProject.activeTask.comment;
    $scope.activeProject.activeTask.checked = false;
     
    $scope.closeEditTask();
    task.title = null;
    task.date= new Date();
    task.comment = null;
    task.checked = false;
    
    $scope.activeProject.activeTask = null;
  };
}