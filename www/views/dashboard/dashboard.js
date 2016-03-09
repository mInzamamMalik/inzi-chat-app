/**
 * Created by malikasinger on 19/08/2015.
 */
angular.module("starter")

  .controller('dashboardController', function ($scope /*,$http, $ionicLoading, $ionicSideMenuDelegate, $ionicPopup, $timeout*/) {

    var ref = new Firebase("https://inzi-chat-app.firebaseio.com");

    $scope.authWithFacebook = function(){

      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });

    }


  });

