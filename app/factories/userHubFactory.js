'use strict';

GoodMorning.factory("UserHubFactory", function($q, $http, FirebaseUrl, $window, geolocation) {

  // let getUserHub = (userHub) => {
  //   return $q( (resolve, reject) => {
  //    $.simpleWeather({
  //     location: 'Nashville, TN',
  //     woeid: '',
  //     unit: 'f'
  //     .then( function(weather) {
  //       resolve(weather);
  //     })
  //     });
  //   });
  //  };


  let getUserInfo = (userId) => {
    console.log("userId", userId);
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}users.json?orderBy="uid"&equalTo="${userId}"`)
      .then( (todoData) => {
        resolve(todoData);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
      });
    });
  };

  let postNewItem = (newItem) => {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseUrl}todos.json`,
        angular.toJson(newItem))
      .then( (newItemData) => {
        resolve(newItemData);
      })
      .catch( (err) => {
        reject(err);
      });
    });
  };

  let updateTodoStatus = (todo) => {
    return $q( (resolve, reject) => {
      let itemId = todo.id;
      // PUT the entire obj to FB
      if (itemId) {
        $http.put(`${FirebaseUrl}todos/${itemId}.json`,
          angular.toJson(todo))
        .then( (data) => {
          resolve(data);
        })
        .catch( (err) => {
          reject(err);
        });
      } else {
        console.log("I'm burned out for the day. Go home");
      }
    });
  };

  let deleteTodoItem = (todoId) => {
    return $q( (resolve, reject) => {
      if (todoId) {
        $http.delete(`${FirebaseUrl}todos/${todoId}.json`)
        .then( (data) => {
          resolve(data);
        })
        .catch( (err) => {
          reject(err);
        });
      } else {
        console.log("No id passed in");
      }
    });
  };

  let getSingleTodoItem = (itemId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}todos/${itemId}.json`)
      .then( (todo) => {
        resolve(todo.data);
      })
      .catch( (err) => {
        reject(err);
      });
    });
  };

  return { getUserInfo, postNewItem, deleteTodoItem, updateTodoStatus, getSingleTodoItem };
});
