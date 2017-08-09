'use strict';

GoodMorning.factory('AlarmFactory', function($q, $http, FirebaseUrl, FBCreds) {

let postMorningObj = (newObj) => {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseUrl}morningdetails.json`,
        angular.toJson(newObj))
      .then( (newMorningData) => {
        resolve(newMorningData);
      })
      .catch( (err) => {
        reject(err);
      });
    });
  };




  return {postMorningObj};

});

