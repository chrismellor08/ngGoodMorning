'use strict';

let GoodMorning = angular.module("GoodMorning", ["ngRoute", "angularMoment", "geolocation"])
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
  .when('/userHub/tomorrow', {
    templateUrl: 'partials/tomorrow.html',
    controller: 'AlarmController'
  })
  .otherwise('/');
});
