'use strict';

GoodMorning.controller('AlarmController', function($window, $scope, $interval, $localStorage, $timeout, UserFactory, UserHubFactory, moment, geolocation, AlarmFactory) {


  $scope.Audio = Audio;
  var alarmSound = new Audio('/01%20Moving%20On%20and%20Getting%20Over.mp3');
  alarmSound.volume = 0.3;

// if(localStorage.alarmTime){
//   alarmTime = new Date(localStorage.alarmTime);
//   turnAlarmOn();
//   alarmButton.prop("disabled", false);
//   alarmInput.timepicker('setTime', alarmTime);
//   alarmClock.find('span').text(alarmInput.val());
// }
//
$scope.personalInfo = {
  greetingTime: "",
  name: UserFactory.userData,
  uid: "",
  currentTime: "",
  background: "",
  finalAlarmTime: "",
  duration: ""
};

$localStorage.name = UserFactory.userData;

if($scope.personalInfo.name !== ""){
  $localStorage.name = $scope.personalInfo.name;
}

$scope.bufferTime = {
  hours: "",
  minutes: ""
};

$scope.arrivalTime = {
  hour: "",
  minute: "",
  meridiam: ""
};

$scope.alarmHours = [
{value: "00"},
{value: "01"},
{value: "02"},
{value: "03"},
{value: "04"},
{value: "05"},
{value: "06"},
{value: "07"},
{value: "08"},
{value: "09"},
{value: "10"},
{value: "11"},
{value: "12"}
];

$scope.alarmMinutes = [
{value: "00"},
{value: "10"},
{value: "20"},
{value: "30"},
{value: "40"},
{value: "50"}
];



$scope.newAlarmTime = {
  whenToBeThere: "",
  whereImAt: "",
  whereImGoing: "",
  bufferTime: "",
  url: "",
  alarmTime: null,
  countdown: null
};

$scope.arrivalHours = [
{value: "01"},
{value: "02"},
{value: "03"},
{value: "04"},
{value: "05"},
{value: "06"},
{value: "07"},
{value: "08"},
{value: "09"},
{value: "10"},
{value: "11"},
{value: "12"}
];


$scope.arrivalMinutes = [
{value: "00"},
{value: "05"},
{value: "10"},
{value: "15"},
{value: "20"},
{value: "25"},
{value: "30"},
{value: "35"},
{value: "40"},
{value: "45"},
{value: "50"},
{value: "55"}
];

$scope.arrivalMeridiam = [
{value: "AM"},
{value: "PM"}
];


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

$scope.loadScreen = () => {
  var l = document.getElementById("loader");
  l.classList.remove("hidden");
  var h = document.getElementById("loadHide");
  h.classList.add("hidden");
    var c = document.getElementById("tomrrowContainer");
  c.classList.add("layer");
};

$scope.hideLoadScreen = () => {
  var l = document.getElementById("loader");
  l.classList.add("hidden");
  var h = document.getElementById("loadHide");
  h.classList.remove("hidden");
  var c = document.getElementById("tomrrowContainer");
  c.classList.remove("layer");
};

$scope.confirm = () => {
  $window.location.href = "#!/userHub/";
};

$scope.logout = () => {
  UserFactory.logoutUser();
};

$scope.getTime = () => {
//getting and formatting the time of day
$scope.m = moment();
let m = $scope.m;
    // let currentTime = "06:30pm";
    let currentTime = m.format("hh:mma");
    $scope.personalInfo.currentTime = currentTime;
    let timeArray = currentTime.split("");
    //adjusting the greeting time based on what time it is
    let greetingTime = currentTime.includes("am") ? "morning" : currentTime.split(':')[0] < 5 || currentTime.split(':')[0] > 11 ? "afternoon" : "evening";
    $scope.personalInfo.greetingTime = greetingTime;
    if(timeArray[0] === 0){
      timeArray.shift();
      let currentTime = timeArray.join("");
    }
    //Adjusting background image according to the greeting time
    if(greetingTime == "evening" && timeArray[0] < 1 && timeArray[1] < 8){
      $scope.personalInfo.background = "/img/sunsetBG.jpg";
    }
    else if(greetingTime == "morning"){
      $scope.personalInfo.background = "/img/new%20morning.jpg";
    }
    else if(greetingTime == "afternoon"){
      $scope.personalInfo.background = "/img/afternoon_bg.jpg";
    }
    else if (greetingTime == "evening"){
      $scope.personalInfo.background = "/img/night_BG.jpg";
    }
  };


  $scope.calculateTravelTime = function(){
    AlarmFactory.postMorningObj($scope.newAlarmTime);
    let handleResponse = function(data)
    {
      $scope.newAlarmTime.whenToBeThere = $scope.arrivalTime.hour + ":" +$scope.arrivalTime.minute + $scope.arrivalTime.meridiam;
      $scope.newAlarmTime.bufferTime = $scope.bufferTime.hours + ":" + $scope.bufferTime.minutes;
      let m = moment();
      // get moment and format as MM/DD/YYYY string
      let formattedTime = m.format("YYYY-MM-DD");
      let arrivalTime = formattedTime + " " + $scope.newAlarmTime.whenToBeThere;

      arrivalTime = moment(arrivalTime, "YYYY-MM-DD h:mma");
      let bufferTime = $scope.newAlarmTime.bufferTime;
      let newBufferTime = moment.duration(bufferTime);
      let duration = data.route.formattedTime.substring(0,5);
      $scope.personalInfo.duration = duration;
      let newDuration = moment.duration(duration);
      let timeToWake = newDuration.add(bufferTime);
      $scope.newAlarmTime.alarmTime = arrivalTime.subtract(timeToWake).set(0, 'seconds');
      let showTime = $scope.newAlarmTime.alarmTime;
      let timeToShow= showTime._d;
      let myAlarmTime = moment(timeToShow).format("hh:mma");
      $scope.personalInfo.finalAlarmTime = myAlarmTime;
      modal.setContent(`<h6> It will currently take you ${$scope.personalInfo.duration} to get to ${$scope.newAlarmTime.whereImGoing}. Since you need need ${$scope.newAlarmTime.bufferTime} to get ready, and you need to be there by ${$scope.newAlarmTime.whenToBeThere}, Your alarm has been set to ${$scope.personalInfo.finalAlarmTime}!     <br><br>We will keep checking to see if it will take longer to get there due to traffic or weather and change your alarm time accordingly!<br><br>  Have a Good Morning!</h6>`);
      modal.addFooterBtn('Sweet, Thanks!', 'tingle-btn tingle-btn--primary', function() {
        $scope.confirm();
        modal.close();
      });
      modal.open();
      $scope.hideLoadScreen();
      // localStorage.setItem
      // localStorage.alarmOn = true;
      // localStorage.newAlarmTime.alarmTime = $scope.newAlarmTime.alarmTime;
    };

    $.ajax({
      url: $scope.newAlarmTime.url,
      dataType: 'jsonp',
      success: function(data) {

      }
    }).done(handleResponse);
  };


//gets location and adds it as your starting point for the mapquest call
$scope.getLocation = () => {
  $scope.loadScreen();
  geolocation.getLocation().then( (data) => {
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
  });
};

//gets the current time and matches it against the time the alarm is set to go off, alerts when matched
$scope.alarmInterval = $window.setInterval( () =>
{
  if($scope.newAlarmTime.alarmTime!==null)
  {
    let now = moment();
    if(now.diff($scope.newAlarmTime.alarmTime, 'seconds') > 0)
    {
      alarmSound.play();
      $window.alert("GETUP!");
              // $scope.newAlarmTime.alarmTime(null);
              // $scope.newAlarmTime.countdown(null);
            }
          }

        }, 1000);


$scope.alarmTimeFormatted =( () => {
  let at = $scope.newAlarmTime.alarmTime;
  if(at!==null)
  {
    return at.format("h:mm:ss a");
  }
  else
  {
    return '';
  }
});
});

