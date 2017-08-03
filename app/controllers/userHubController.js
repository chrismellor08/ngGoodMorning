'use strict';

GoodMorning.controller("UserHubController", function($scope, $interval, UserFactory, UserHubFactory, moment) {

$scope.newTodayHub= {
    greetingTime: "",
    name: "",
    uid: "",
    currentTime: "",
    background: ""
  };


	$scope.hubToday = () => {
		console.log("testing",UserFactory.userInfo);
		$scope.m = moment();
		console.log("it's workin");
		let m = $scope.m;
		let currentTime = m.format("hh:mma");
		$scope.newTodayHub.currentTime = currentTime;
      // let currentTime = "1:30am";
      let timeArray = currentTime.split("");
      console.log(timeArray);
      let greetingTime = "";

      if (timeArray[0] === 0 && timeArray[1] >= 4 && timeArray[5] == "p"){
      	greetingTime = "evening";
      }
      else if (timeArray[0] === 0 && timeArray[1] < 6 && timeArray[5] == "a"){
      	greetingTime = "evening";
      }
      else if(timeArray[0] == 1 && timeArray[1] == 2 && timeArray[5] == "p"){
      	greetingTime = "afternoon";
      }
      else if (timeArray[0] == 1 && timeArray[5] == "p"){
      	greetingTime = "evening";
      }
      else if(timeArray[0] === 0 && timeArray[1] > 0 && timeArray[1] < 4 && timeArray[5] == "p"){
      	greetingTime = "afternoon";
      }
      else if(timeArray[0] === 0 && timeArray[1] > 3 && timeArray[5] == "a"){
      	greetingTime = "morning";
      }
      else if(timeArray[0] == 1 && timeArray[1] == 2 && timeArray[5] == "a") {
      	greetingTime = "evening";
      }
      else {
      	greetingTime = "morning";
      }

      $scope.newTodayHub.greetingTime = greetingTime;
      if(timeArray[0] === 0){
      	timeArray.shift();
      	let currentTime = timeArray.join("");
      	console.log(currentTime);
      }
      if(greetingTime == "evening" && timeArray[0] < 7){
      	$scope.newTodayHub.background = "/img/Black_Mountain_Sunset-27527.jpg";
      }
      else if(greetingTime == "morning"){
      	$scope.newTodayHub.background = "/img/smoky-foggy-mountain-sunrise-iphone-6-lakes-mounts-light-sunrise-peaks-golden-trees-amabar-rivers-awesome-morning-brightness-dawn-nice-fog-twilight-black-afternoon-amazing-cool-grove-wood-glare-12.jpg";
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
}, 10000);
  });



// $(document).ready(function(){
// 	$scope.hubToday();
// });

