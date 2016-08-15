//Inzi Chat App
//http://facebook.com/InziChat
//

angular.module('starter', ['ionic', 'firebase'])

  .controller("appController", function ($rootScope, $ionicScrollDelegate) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

      if (toState.name == "dashboard") {

        console.log("scroll to top");
        setTimeout(function () {
          $ionicScrollDelegate.scrollTop();
        }, 100)

      } else if (toState.name == "inbox") {
        console.log("scroll to bottom");
        setTimeout(function () {
          $ionicScrollDelegate.scrollBottom();
        }, 100)
      }
    });
  })


  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })





