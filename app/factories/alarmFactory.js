'use strict';

GoodMorning.factory('AlarmFactory', function($q, $http, FirebaseUrl, FBCreds, $localStorage) {

 let thisAlarm = null;
 $localStorage.thisAlarm = null;
 let recentAlarm = null;

 let postMorningObj = (newObj) => {
  return $q( (resolve, reject) => {
    $http.post(`${FirebaseUrl}morningdetails.json`,
      angular.toJson(newObj))
    .then( (newMorningData) => {

      thisAlarm = newMorningData.data.name;
      resolve(newMorningData);
    })
    .catch( (err) => {
      reject(err);
    });
  });
};


let getRecentAlarmTime = (data) => {
  return $q( (resolve, reject) => {
    $http.get(`${FirebaseUrl}morningdetails/${thisAlarm}.json`,
      angular.toJson(data))
    .then( (oldAlarm) => {
      recentAlarm = oldAlarm.data.finalAlarmTime;
      $localStorage.thisAlarm = oldAlarm.data.finalAlarmTime;
      resolve(oldAlarm);
    });
  });
};

let testLocal = () => {
  return $localStorage.thisAlarm;
};

let getAlarmTime = () => {
  return thisAlarm;
};

let getOldAlarmTime = () => {
  return recentAlarm;
};

return {postMorningObj, thisAlarm, getAlarmTime, getRecentAlarmTime, getOldAlarmTime, testLocal};

});

