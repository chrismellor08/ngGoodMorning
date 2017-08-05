// Leaving off - console log will show the proper time to wake up. Date is still not correct,
// but the alarm time can probably still be set according to what we already have access to.
// this shit gon' be dope.

'use strict';

GoodMorning.controller('AlarmController', function($window, $scope, $interval, UserFactory, UserHubFactory, moment, geolocation, AlarmFactory) {
// $scope.Audio = Audio;
// var alarmSound = new Audio('/audio/01%20Moving%20On%20and%20Getting%20Over.mp3');
// alarmSound.volume = 0.3;

// if(localStorage.alarmTime){
//   alarmTime = new Date(localStorage.alarmTime);
//   turnAlarmOn();
//   alarmButton.prop("disabled", false);
//   alarmInput.timepicker('setTime', alarmTime);
//   alarmClock.find('span').text(alarmInput.val());
// }

$scope.newAlarmTime = {
  whenToBeThere:  "1:48am",
  whereImAt: "",
  whereImGoing: "nashville, tn",
  bufferTime: "0:01",
  url: "",
  alarmTime: null,
  countdown: null
};

$scope.logout = () => {
  UserFactory.logoutUser();
};

$scope.calculateTravelTime = function(){
  AlarmFactory.postMorningObj($scope.newAlarmTime);
  let handleResponse = function(data)
  {
    let m = moment();
      // get moment and format as MM/DD/YYYY string
      let formattedTime = m.format("YYYY-MM-DD");
      let arrivalTime = formattedTime + " " + $scope.newAlarmTime.whenToBeThere;
      console.log("Arr", arrivalTime);
      arrivalTime = moment(arrivalTime, "YYYY-MM-DD h:mma");
      let bufferTime = $scope.newAlarmTime.bufferTime;
      let newBufferTime = moment.duration(bufferTime);
      console.log("NBTTT", newBufferTime);
      console.log(arrivalTime.format());
      let duration = data.route.formattedTime.substring(0,5);
      console.log(duration);
      let newDuration = moment.duration(duration);
      console.log("ND", newDuration);
      let timeToWake = newDuration.add(bufferTime);
      console.log("TTW", timeToWake);
      $scope.newAlarmTime.alarmTime = arrivalTime.subtract(timeToWake).set(0, 'seconds');
      console.log("NAT", $scope.newAlarmTime.alarmTime);
      // localStorage.setItem
      // localStorage.alarmOn = true;
      // localStorage.newAlarmTime.alarmTime = $scope.newAlarmTime.alarmTime;

    };

    $.ajax({
      url: $scope.newAlarmTime.url,
      dataType: 'jsonp',
      success: function(data) {
        console.log("dat", data);
      }
    }).done(handleResponse);
  };


//gets location and adds it as your starting point for the mapquest call
$scope.getLocation = () => {
  geolocation.getLocation().then(function(data){
    let coordsObj = {lat:data.coords.latitude, long:data.coords.longitude};
    let coords = coordsObj.lat + ", " + coordsObj.long;
    $scope.newAlarmTime.whereImAt = coords;
    let wtg = $scope.newAlarmTime.whereImGoing.split(' ').join('%2C+').split(',').join('');
    //get the location i'm currently at
    let wia = $scope.newAlarmTime.whereImAt.split(' ').join('%2C+').split(',').join('');
    //Get the time I need to leave(make an api call to mapquest to get route duration)
    let url = `https://www.mapquestapi.com/directions/v2/route?key=iQGI2sxewb82LU7dJKLDo64XXVb06ZUL&from=${wia}&to=${wtg}&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`;
    $scope.newAlarmTime.url = url;
    $scope.calculateTravelTime();
    console.log($scope.newAlarmTime);
  });
};

$scope.alarmInterval = $window.setInterval(function()
{
  if($scope.newAlarmTime.alarmTime!==null)
  {
    let now = moment();
    if(now.diff($scope.newAlarmTime.alarmTime, 'seconds') > 0)
    {
            // alarmSound.play();
            console.log("GETUP!");
              // $scope.newAlarmTime.alarmTime(null);
              // $scope.newAlarmTime.countdown(null);
            }
          }

        }, 1000);


$scope.alarmTimeFormatted =(function()
{
  let at = $scope.newAlarmTime.alarmTime;
  if(at!==null)
  {
    console.log(at);
    return at.format("h:mm:ss a");
  }
  else
  {
    return '';
  }
});


});

