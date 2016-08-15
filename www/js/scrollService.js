/**
 * Created by 205 on 3/19/2016.
 */



angular.module('starter')
  .service("scrollService", function ($rootScope, $ionicScrollDelegate, usersService) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.name == "dashboard") {
        console.log("scroll to top");
        setTimeout(function () {
          $ionicScrollDelegate.scrollTop();
        }, 100)
      }
    });
  });
