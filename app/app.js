'use strict';

let GoodMorning = angular.module("GoodMorning", ["ngRoute", "angularMoment", "geolocation", 'moment-picker', "ngStorage"])
.constant("FirebaseUrl", "https://ng-goodmorning.firebaseio.com/");

GoodMorning.config( ($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'UserController'
  })
  .when('/userHub/', {
    templateUrl: 'partials/userHub.html',
    controller: 'UserHubController'
  })
  .when('/userHub/tomorrow', {
    templateUrl: 'partials/tomorrow.html',
    controller: 'AlarmController'
  })
  .when('/userHub/confirmation', {
    templateUrl: 'partials/confirmation.html',
    controller: 'AlarmController'
  })
  .otherwise('/');
});


let isAuth = (UserFactory) => {
  return new Promise( (resolve, reject) => {
    UserFactory.isAuthenticated()
    .then( (userBoolean) => {
      if(userBoolean) {
        resolve();
      } else {
        reject();
      }
    });
  });
};