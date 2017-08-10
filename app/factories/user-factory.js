'use strict';

GoodMorning.factory('UserFactory', function($q, $localStorage, $http, FirebaseUrl, FBCreds, geolocation) {
  var config = {
    apiKey: FBCreds.apiKey,
    authDomain: FBCreds.authDomain
  };

  firebase.initializeApp(config);

  let userInfo = [];
  let coords = {};
  let userData = $localStorage.name;
  let userId = "Test";
  let currentUser = null;
  let thisUser = null;
  let thisId = null;


  $localStorage.name = "";
  $localStorage.userId = "";


  let isAuthenticated = function() {

    return new Promise( (resolve, reject) => {

      firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
          $localStorage.name = user.displayName.split(" ")[0];
          $localStorage.userId = user.uid;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  let getUser = () => {
    return $localStorage.userId;
  };

  let getName = () => {
    return $localStorage.name;
  };

  let loginUser = () => {
    return $q( (resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then( (user) => {
        thisId = user.user.uid;
        thisUser = user.additionalUserInfo.profile.given_name;
        userData = thisUser;
        $localStorage.name = thisUser;
        currentUser = user.uid;
        userInfo.push(user);
        resolve(user);
        return [thisUser, thisId];
      })
      .catch( (err) => {
        reject(err);
      });
    });
  };

// let postNewItem = (newItem) => {
//     return $q( (resolve, reject) => {

//       .then( (newItemData) => {
//         resolve(newItemData);
//       })
//       .catch( (err) => {
//         reject(err);
//       });
//     });
//   };
//

let getThisUser = () => {
  return thisUser;
};

let logoutUser = () => {
  return firebase.auth().signOut()
  .catch( (err) => {
    console.log("error logging out", err.message);
  });
};

return {isAuthenticated, loginUser, logoutUser, getThisUser, getUser, getName, userData};
});