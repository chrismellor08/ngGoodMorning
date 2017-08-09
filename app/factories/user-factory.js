'use strict';

GoodMorning.factory('UserFactory', function($q, $localStorage, $http, FirebaseUrl, FBCreds, geolocation) {

let userInfo = [];
let coords = {};
let userData = $localStorage.name;

$localStorage.name = "";
  var config = {
    apiKey: FBCreds.apiKey,
    authDomain: FBCreds.authDomain
  };

  firebase.initializeApp(config);

  let currentUser = null;
  let thisUser = null;
  let isAuthenticated = function() {
    console.log("isAuthenticated called");
    return new Promise( (resolve, reject) => {
      console.log("firing onAuthStateChanged");
      firebase.auth().onAuthStateChanged(function(user) {
        console.log("onAuthStateChanged finished");
        if (user) {
          $localStorage.name = user.displayName.split(" ")[0];
          console.log("DATAA", userData);
          console.log("user", user);
          currentUser = user.uid;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  let getUser = () => {
    return currentUser;
  };

  let loginUser = () => {
    return $q( (resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then( (user) => {
        thisUser = user.additionalUserInfo.profile.given_name;
        userData = thisUser;
        $localStorage.name = thisUser;
        console.log("mkay", $localStorage.name);
        currentUser = user.uid;
        userInfo.push(user);
        resolve(user);
        return thisUser;
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

  return {isAuthenticated, getUser, loginUser, logoutUser, getThisUser, userData};

});