'use strict';

GoodMorning.controller("UserHubController", function($window, $scope, $interval, UserFactory, UserHubFactory, moment, geolocation) {

  $scope.newTodayHub= {
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

$scope.logout = () => {
  UserFactory.logoutUser();

};

$scope.tomorrow = () => {
  console.log("clicked tomorrow");
  $window.location.href = "#!/userHub/tomorrow";
};

$scope.hubToday = () => {
  $scope.getLocation();
  console.log("testing",UserFactory.userInfo);
  $scope.m = moment();
  console.log("it's workin");
  let m = $scope.m;
  let currentTime = m.format("hh:mma");
  $scope.newTodayHub.currentTime = currentTime;
      // let currentTime = "1:30am";
      let timeArray = currentTime.split("");
      console.log(timeArray);
      let greetingTime = currentTime.includes("am") ? "morning" : currentTime.split(':')[0] < 5 ? "afternoon" : "evening";
      console.log(greetingTime);
      $scope.newTodayHub.greetingTime = greetingTime;
      if(timeArray[0] === 0){
      	timeArray.shift();
      	let currentTime = timeArray.join("");
      	console.log(currentTime);
        console.log("TA",timeArray);
      }
      if(greetingTime == "evening" && timeArray[0] > 1 && timeArray[1] < 7){
      	$scope.newTodayHub.background = "/img/Black_Mountain_Sunset-27527.jpg";
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
    $interval(function(){
     $scope.hubToday();
   }, 1000000000);
  });



// $(document).ready(function(){
// 	$scope.hubToday();
// });

