'use strict';

let GoodMorning = angular.module("GoodMorning", ["ngRoute", "angularMoment"])
.constant("FirebaseUrl", "https://ng-goodmorning.firebaseio.com/");

GoodMorning.config( ($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'UserController'
  })
  .when('/userHub', {
    templateUrl: 'partials/userHub.html',
    controller: 'UserHubController'
  })
  .when('/todos/new', {
    templateUrl: 'partials/todo-form.html',
    controller: 'TodoAddController'
  })
  .when('/todos/detail/:todoId', {
    templateUrl: 'partials/todo-detail.html',
    controller: 'TodoDetailController'
  })
  .when('/todos/edit/:todoId', {
    templateUrl: 'partials/todo-form.html',
    controller: 'TodoEditController'
  })
  .otherwise('/');
});
