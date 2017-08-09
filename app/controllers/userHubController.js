'use strict';

GoodMorning.controller("UserHubController", function($window, $scope, $interval, $routeParams, $localStorage, UserFactory, moment, geolocation, UserHubFactory, UserNameFactory) {

$window.onload=function(){
         $window.setTimeout(function(){
           angular.bootstrap(document.body,[]);
         },4000);
      };

  $scope.newTodayHub = {
    greetingTime: "",
    name: UserFactory.userData,
    uid: "",
    currentTime: "",
    background: "",
    userid: ""
  };

$scope.userAuth = () => {
  UserFactory.isAuthenticated()
  .then((data) => {
    console.log("yareddy", data);
    //
  });
};

if($scope.newTodayHub.name !== ""){
  $localStorage.name = $scope.newTodayHub.name;
}

// if($localStorage.name === ""){
//   $scope.newTodayHub.name = $localStorage.name;
// }
//

$localStorage.name = UserFactory.userData;

console.log("gfiud", UserFactory.userData);

$scope.login = () => {
    UserFactory.loginUser()
    .then( (userData) => {

      $scope.userName = userData.additionalUserInfo.profile.given_name;
      $scope.uid = userData.user.uid;
      console.log("userData", userData);
      console.log("KAPOW", UserFactory.userInfo);
      $window.location.href = `#!/userHub/`;

    });
  };


// $localStorage.name = UserFactory.getThisUser();

//   if($scope.newTodayHub.name === "") {
//     $scope.newTodayHub.name = UserFactory.$localStorage.name;
//   }

//   $scope.newTodayHub.name = UserFactory.getUser();

  console.log("UN", $scope.userName);
  // $scope.newTodayHub.name = $scope.userName.additionalUserInfo.given_name;
  // console.log("VHQE", $scope.newTodayHub.name);

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
    $scope.userAuth();
    $scope.getLocation();
    $scope.m = moment();
    let m = $scope.m;
    // let currentTime = "06:30pm";
    let currentTime = m.format("hh:mma");
    $scope.newTodayHub.currentTime = currentTime;
    let timeArray = currentTime.split("");
    //adjusting the greeting time based on what time it is
    let greetingTime = currentTime.includes("am") ? "morning" : currentTime.split(':')[0] < 5 || currentTime.split(':')[0] > 11 ? "afternoon" : "evening";
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
  }, 100000);


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

