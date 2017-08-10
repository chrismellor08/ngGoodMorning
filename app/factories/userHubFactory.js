'use strict';

GoodMorning.factory("UserHubFactory", function($q, $http, FirebaseUrl, $window, geolocation) {

  // let getUserHub = (userHub) => {
  //   return $q( (resolve, reject) => {
  //    $.simpleWeather({
  //     location: 'Nashville, TN',
  //     woeid: '',
  //     unit: 'f'
  //     .then( function(weather) {
  //       resolve(weather);
  //     })
  //     });
  //   });
  //  };


  let getUserInfo = (userId) => {
    return $q( (resolve, reject) => {
      $http.get(`https://ng-goodmorning.firebaseio.com/morningdetails.json?orderBy="uid"&equalTo="${userId}"`)
      .then( (alarmData) => {
        resolve(alarmData.data);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
      });
    });
  };


  let deleteOldAlarm = (userId) => {
    return $q( (resolve, reject) => {
      if (userId) {
        $http.delete(`$https://ng-goodmorning.firebaseio.com/morningdetails.json?orderBy="uid"&equalTo="${userId}"`)
        .then( (data) => {
          resolve(data);
        })
        .catch( (err) => {
          reject(err);
        });
      } else {
        console.log("No id passed in");
      }
    });
  };


  return {getUserInfo, deleteOldAlarm};
});
