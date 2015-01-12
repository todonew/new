'use strict';

angular.module('todo.controllers', [
  'ionic',
  'todo.services'
])  
.controller('ProjectsCtrl', ProjectsCtrl)
.controller(['TaskCtrl', 'TaskService'], TaskCtrl, TaskService)
.controller('authorizCtrl', authorizCtrl)

TaskCtrl.$inject = ['$scope'];
function TaskCtrl ($scope){
// called when the form is submited
  $scope.saveTask = function (task) {
    TaskService.saveTask(task);
  };
  $scope.deleteActiveTask = function(task){
    if(typeof task ==="undefined") return;
    console.log("delete an: " +  task.title);
    var index  = $scope.activeProject.tasks.indexOf(task);
    $scope.activeProject.tasks.splice(index, 1);
  };
  $scope.activeTask = function(task){
    return $scope.activeProject.activeTask = task;
  };
  $scope.getTaskID = function(task){
    for(var i =  0; i < $scope.activeProject.length; i ++){
        if ($scope.activeProject.tasks[i] == task){
          console.log("id" + $scope.activeProject.tasks[i]);
          return i;
        }
      }
      return -1;
  };
  // create and load models
  $ionicModal.fromTemplateUrl('templates/task-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.taskModal = modal;
  });
  $ionicModal.fromTemplateUrl('templates/task-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.editTaskModal = modal;
  });
  $scope.newTask = function(){
    $scope.edit = false;
    $scope.taskModal.show();
  };
  $scope.closeNewTask = function(){
    $scope.edit = null;
    $scope.taskModal.hide();
  };
  $scope.editActiveTask =  function(task){
    $scope.edit = true;
    $scope.editTaskModal.show();  
  };
  $scope.closeEditTask = function(){
    $scope.edit = null;
    $scope.editTaskModal.hide();
  };
  $scope.toggleCheckTask = function(task){
    task.checked = !task.checked;
  };

}

ProjectsCtrl.$inject = ['$scope', '$timeout', '$ionicModal', 'ProjectsService', '$ionicSideMenuDelegate'];
function ProjectsCtrl ($scope, $timeout, $ionicModal, ProjectsService, $ionicSideMenuDelegate) {
  
  $scope.projects = ProjectsService.all();
  $scope.$watch('projects', function(newValue, oldValue) {
      ProjectsService.save($scope.projects);
  }, true);

  $scope.$watch('activeProject', function (newValue, oldValue) {
     if (newValue == oldValue) return false;
      ProjectsService.setActiveProject($scope.activeProject);
  }, true);

  $timeout(function() {
     var a = ProjectsService.getLastActiveProject();
     // console.log("initActive project", a);
     $scope.activeProject = a || newProject();
  },1000);

  $scope.createProject = function(project){
     var newProject = Projects.newProject(project.name);
     $scope.projects.push(newProject);
     $scope.selectProject(newProject);
     $scope.closeNewProject();
     project.name = null;
  };
  $scope.isActive = function (project) {
     return $scope.activeProject === project;
  };
  // called to sellect the given project
  $scope.selectProject  = function(project){
     $scope.activeProject = project;
     $ionicSideMenuDelegate.toggleLeft(true);
  };
  $scope.deleteSelectedProject = function(selectedProject){
     if (typeof selectedProject === 'undefined') return;
     var index = $scope.projects.indexOf(selectedProject);
     for (var i = 0; i <= $scope.projects[index].tasks.length; i++) {
       $scope.projects[index].tasks.splice(i);
     }
     $scope.projects.splice(index, 1);
  };
  $scope.toggleProjects = function(){
     $ionicSideMenuDelegate.toggleLeft();
  };
  $ionicModal.fromTemplateUrl('templates/create-new-project-modal.html',{
     scope: $scope,
     animation: 'slide-in-up'
  }).then(function(modal){
     $scope.projectModal = modal;
     console.log("modal");
  });
  $scope.newProject = function(){
    $scope.projectModal.show();
  };
  $scope.closeNewProject = function(){
     $scope.projectModal.hide();
  };
}
authorizCtrl.$inject = ['$scope'];

authorizCtrl = function(){
  $scope.signIn = function(user){

  };
  $scope.signUp = function(newUser){

    var TestObject = Parse.Object.extend("newUser");
    var newUser = new newUser();
    newUser.save({name: newUser.name, password: newUser.password})
              .then(function(object) {
                alert("yay! it worked");
              });
  };

}