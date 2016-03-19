/**
 * Created by 205 on 3/10/2016.
 */


angular.module('starter')

  .service("universalService", function ($rootScope, $state, notificationService, locationService) {
    var vm = this;

    //var amOnline = new Firebase('https://inzi-chat-app.firebaseio.com/.info/connected');

    $rootScope.ref = new Firebase("https://inzi-chat-app.firebaseio.com");

    vm.authData = $rootScope.ref.getAuth();
    if (vm.authData) {
      console.log("getAuth: User " + vm.authData.uid + " is logged in with " + vm.authData.provider);
      locationService.startWatchingMyGeoPosition();
      $state.go("dashboard");
    } else {
      //console.log("User is logged out");
      $state.go("home");
      //notificationService.js.showAlert("please login","its look like you are not logged in")
    }


    vm.authWithFacebook = function () {
      $rootScope.ref.authWithOAuthPopup("facebook", function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          vm.authData = authData;

          console.log("Authenticated successfully with payload:", authData);

          vm.currentRef = $rootScope.ref.child(authData.uid);

          vm.currentRef.update({
            name: authData.facebook.displayName,
            gender: authData.facebook.cachedUserProfile.gender,
            profileImageURL: authData.facebook.profileImageURL,
            expires: authData.expires,
            uid: authData.uid
          });

          vm.currentRef.on("value", function (snap) {
            data = snap.val();

            if (!data.joined) {
              vm.currentRef.update({
                joined: Firebase.ServerValue.TIMESTAMP
              });
            }
          });


          $state.go("dashboard");
          $rootScope.ref.onAuth(authDataCallback);
        }
      })
    };


    vm.authWithTwitter = function () {
      $rootScope.ref.authWithOAuthPopup("twitter", function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          vm.authData = authData;

          console.log("Authenticated successfully with payload:", authData);

          vm.currentRef = $rootScope.ref.child(authData.uid);

          vm.currentRef.update({
            name: authData.twitter.displayName,
            //gender: authData.facebook.cachedUserProfile.gender,
            profileImageURL: authData.twitter.profileImageURL,
            expires: authData.expires,
            uid: authData.uid
          });

          vm.currentRef.on("value", function (snap) {
            data = snap.val();

            if (!data.joined) {
              vm.currentRef.update({
                joined: Firebase.ServerValue.TIMESTAMP
              });
            }
          });


          $state.go("dashboard");
          $rootScope.ref.onAuth(authDataCallback);
        }
      })
    };


    vm.authWithGoogle = function () {
      $rootScope.ref.authWithOAuthPopup("google", function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          vm.authData = authData;

          console.log("Authenticated successfully with payload:", authData);

          vm.currentRef = $rootScope.ref.child(authData.uid);

          vm.currentRef.update({
            name: authData.google.displayName,
            // gender: authData.google.cachedUserProfile.gender,
            profileImageURL: authData.google.profileImageURL,
            expires: authData.expires,
            uid: authData.uid
          });

          vm.currentRef.on("value", function (snap) {
            data = snap.val();

            if (!data.joined) {
              vm.currentRef.update({
                joined: Firebase.ServerValue.TIMESTAMP
              });
            }
          });


          $state.go("dashboard");
          $rootScope.ref.onAuth(authDataCallback);
        }
      })
    };


    function authDataCallback(authData) {
      if (authData) {
        console.log("authChanged: User " + authData.uid + " is logged in with " + authData.provider);
        $rootScope.ref.child(authData.uid).update({loggedIn: true});
        locationService.startWatchingMyGeoPosition();
      } else {
        console.log("User is logged out");
        $state.go("home");
        notificationService.showAlert("please login again", "its look like your session is expired")

      }
    }


    vm.logout = function () {
      $rootScope.ref.offAuth(authDataCallback);
      $rootScope.ref.child(vm.authData.uid).update({loggedIn: false});
      $rootScope.ref.unauth();
      $state.go("home");
      notificationService.showAlert("Thankyou for using :-)", "hope you experienced well");

    }
  })







  //////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
