'use strict';

GoodMorning.controller("UserHubController", function($window, $scope, $interval, $routeParams, $localStorage, UserFactory, moment, geolocation, UserHubFactory, AlarmFactory) {

  $window.onload=function(){
   $window.setTimeout(function(){
     angular.bootstrap(document.body,[]);
   },4000);
 };


 let modal = new tingle.modal({
  footer: true,
  stickyFooter: false,
  closeMethods: ['overlay', 'button', 'escape'],
  closeLabel: "Close",
  cssClass: ['custom-class-1', 'custom-class-2'],
  onOpen: function() {
  },
  onClose: function() {
  },
  beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
      }
    });


$scope.alarmObj = "";


$scope.newTodayHub = {
  greetingTime: "",
  name: UserFactory.getName(),
  currentTime: "",
  background: "",
  userid: UserFactory.getUser()
};

$scope.userAuth = () => {
  UserFactory.isAuthenticated()
  .then((data) => {
    $scope.getStoredAlarm();

  });
};

 $scope.alarms = {
  alarmTime: AlarmFactory.testLocal()
};


if($scope.newTodayHub.name !== ""){
  $localStorage.name = $scope.newTodayHub.name;
}





$localStorage.name = UserFactory.getThisUser();

  // if($scope.newTodayHub.name === "") {
  //   $scope.newTodayHub.name = UserFactory.$localStorage.name;
  // }

//   $scope.newTodayHub.name = UserFactory.getUser();


  // $scope.newTodayHub.name = $scope.userName.additionalUserInfo.given_name;
  //

  let coords = {};

//gets location and adds it as your starting point for the mapquest call
$scope.getLocation = () => {
  geolocation.getLocation().then(function(data){
    let coordsObj = {lat:data.coords.latitude, long:data.coords.longitude};
    let coords = coordsObj.lat + ", " + coordsObj.long;
    $scope.newTodayHub.wia = coords;
  });
};

$scope.init = () => {
  $scope.hubToday();
  modal.setContent(`<h2>Hello, ${$scope.newTodayHub.name}!</h2><br>Welcome to Good Morning<br><br> Good Morning is an app designed to make sure you never have a stressful morning again. Simply enter a few details about your day the night before, and allow us to generate an alarm clock for you based on where you need to go, traffic delays, weather conditions, and anything you might need to do before you get to where you're going!`);
  modal.addFooterBtn('Sounds Good!', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function() {
    modal.close();
  });
  modal.open();
};

$scope.getStoredAlarm = () => {
  UserHubFactory.getUserInfo(UserFactory.getUser())
  .then ( (data) => {

  });
};


$scope.getAlarmObject = () => {
 $scope.alarmObj = AlarmFactory.getAlarmTime();

};

$scope.oldAlarmTime = AlarmFactory.getOldAlarmTime();

$scope.getOldAlarmTime = () => {
  AlarmFactory.getRecentAlarmTime()
  .then( (data) => {

    $scope.alarms.alarmTime = data.data.finalAlarmTime;
  });
};

$scope.hubToday = () => {
//getting and formatting the time of day
$scope.userAuth();
$scope.getLocation();
$scope.getAlarmObject();
$scope.getOldAlarmTime();
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
  }, 1000);


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

