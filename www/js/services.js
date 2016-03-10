/**
 * Created by 205 on 3/10/2016.
 */


angular.module('starter')

  .service("universalService", function ($state) {
    var vm = this;

    var ref = new Firebase("https://inzi-chat-app.firebaseio.com");


    vm.authData = ref.getAuth();
    if (vm.authData) {
      console.log("User " + vm.authData.uid + " is logged in with " + vm.authData.provider);
    } else {
      console.log("User is logged out");
      $state.go("home");
    }


    vm.authWithFacebook = function () {
      ref.authWithOAuthPopup("facebook", function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          vm.authData = authData;
          localStorage.setItem("auth", JSON.stringify(authData));
          console.log("Authenticated successfully with payload:", authData);

          ref.child(authData.uid).update({name: "abc"});

          $state.go("dashboard");
        }
      })
    };

    function authDataCallback(authData) {
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        ref.child(authData.uid).update({loggedIn: true});
      } else {
        //ref.child(vm.authData.uid).update({loggedIn: false});
        console.log("User is logged out");
        $state.go("home");
      }
    };
    ref.onAuth(authDataCallback);


    vm.logout = function () {
      console.log(ref);
      ref.unauth();
      $state.go("home");

    }



  });
