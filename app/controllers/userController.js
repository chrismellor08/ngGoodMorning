'use strict';

GoodMorning.controller('UserController', function ($scope, $routeParams, $window, UserFactory, UserHubFactory) {

  $scope.user = {
    userid: ""
  };

  $scope.login = () => {
    UserFactory.loginUser()
      .then((userData) => {
        $scope.userName = userData.additionalUserInfo.profile.given_name;
        $scope.uid = userData.user.uid;
        console.log("userData", userData);
        console.log("KAPOW", UserFactory.userInfo);
        $window.location.href = `#!/userHub/`;

      });
  };

  $scope.logout = () => {
    UserFactory.logoutUser();
    $window.location.href = '#!/';
  };

});