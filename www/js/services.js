/**
 * Created by 205 on 3/10/2016.
 */


angular.module('starter')

  .service("universalService", function ($rootScope, $state, notificationService) {
    var vm = this;

    //var amOnline = new Firebase('https://inzi-chat-app.firebaseio.com/.info/connected');

    $rootScope.ref = new Firebase("https://inzi-chat-app.firebaseio.com");

    vm.authData = $rootScope.ref.getAuth();
    if (vm.authData) {
      console.log("User " + vm.authData.uid + " is logged in with " + vm.authData.provider);
    } else {
      //console.log("User is logged out");
      $state.go("home");
      //notificationService.showAlert("please login","its look like you are not logged in")
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

          $state.go("dashboard");
          $rootScope.ref.onAuth(authDataCallback);
        }
      })
    };

    function authDataCallback(authData) {
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        $rootScope.ref.child(authData.uid).update({loggedIn: true});
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


  .service("usersService", function ($rootScope) {

    var vm = this;
    vm.userlist = "";

    vm.myUid = function () {
      console.log("under service",$rootScope.ref.getAuth().uid);

      return $rootScope.ref.getAuth().uid;
    };

    //
    //$rootScope.ref.on("value", function (snapShot) {
    //  vm.userlist = snapShot.val();
    //  console.log("underservice", vm.userlist);
    //});

  })



  //////////////////////////////////////////////////////////////////////////////////////
  .service("notificationService", function ($ionicPopup, $ionicLoading) {
    this.showLoading = function (text) {
      $ionicLoading.show({
        template: text
      });
    };
    this.hideLoading = function () {
      $ionicLoading.hide();
    };
    this.showAlert = function (title, template) {
      $ionicPopup.alert({
        title: title,
        template: template
      });
    };

    this.showConfirm = function (title, template, onTrue, onFalse) {
      var confirmPopup = $ionicPopup.confirm({
        title: title,
        template: template

      }).then(function (res) {
        if (res) {
          onTrue();
        } else {
          onFalse();
        }
      });
    };
  });
//////////////////////////////////////////////////////////////////////////////////////
