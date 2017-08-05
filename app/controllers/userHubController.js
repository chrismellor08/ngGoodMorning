'use strict';

GoodMorning.controller("UserHubController", function($window, $scope, $interval, UserFactory, moment, geolocation) {

  $scope.newTodayHub = {
    greetingTime: "",
    name: "",
    uid: "",
    currentTime: "",
    background: ""
  };

  let coords = {};

//gets location and adds it as your starting point for the mapquest call
  $scope.getLocation = () => {
    geolocation.getLocation().then(function(data){
      let coordsObj = {lat:data.coords.latitude, long:data.coords.longitude};
      let coords = coordsObj.lat + ", " + coordsObj.long;
      $scope.newTodayHub.wia = coords;
    });
  };

  $scope.hubToday = () => {
//getting and formatting the time of day
    $scope.getLocation();
    $scope.m = moment();
    let m = $scope.m;
    // let currentTime = "06:30pm";
    let currentTime = m.format("hh:mma");
    $scope.newTodayHub.currentTime = currentTime;
    let timeArray = currentTime.split("");
    //adjusting the greeting time based on what time it is
    let greetingTime = currentTime.includes("am") ? "morning" : currentTime.split(':')[0] < 5 ? "afternoon" : "evening";
    $scope.newTodayHub.greetingTime = greetingTime;
    if(timeArray[0] === 0){
      timeArray.shift();
      let currentTime = timeArray.join("");
    }
    //Adjusting background image according to the greeting time
    if(greetingTime == "evening" && timeArray[0] < 1 && timeArray[1] < 8){
      $scope.newTodayHub.background = "/img/sunsetBG.jpg";
    }
    else if(greetingTime == "morning"){
      $scope.newTodayHub.background = "/img/new%20morning.jpg";
    }
    else if(greetingTime == "afternoon"){
      $scope.newTodayHub.background = "/img/afternoon_bg.jpg";
    }
    else if (greetingTime == "evening"){
      $scope.newTodayHub.background = "/img/night_BG.jpg";
    }
  };

  //runs the function at an interval to update the clock on the screen and the location of the user
  $interval(function(){
    $scope.hubToday();
  }, 1000000000);


  $scope.logout = () => {
    UserFactory.logoutUser();
  };


  $scope.tomorrow = () => {
    $window.location.href = "#!/userHub/tomorrow";
  };

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.isLoggedIn = true;
      $scope.$apply();
    } else {
      $scope.isLoggedIn = false;
      $scope.$apply();
      $window.location.href = "#!/login";
    }
  });
});

// $(document).ready(function(){
// 	$scope.hubToday();
// });

