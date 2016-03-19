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


  .service("locationService", function ($rootScope,notificationService) {


    navigator.geolocation.watchPosition(function(position) {

      document.getElementById('currentLat').innerHTML = position.coords.latitude;
      document.getElementById('currentLon').innerHTML = position.coords.longitude;

    });


        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        //:::                                                                         :::
        //:::  This routine calculates the distance between two points (given the     :::
        //:::  latitude/longitude of those points). It is being used to calculate     :::
        //:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
        //:::                                                                         :::
        //:::  Definitions:                                                           :::
        //:::    South latitudes are negative, east longitudes are positive           :::
        //:::                                                                         :::
        //:::  Passed to function:                                                    :::
        //:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
        //:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
        //:::    unit = the unit you desire for results                               :::
        //:::           where: 'M' is statute miles (default)                         :::
        //:::                  'K' is kilometers                                      :::
        //:::                  'N' is nautical miles                                  :::
        //:::                                                                         :::
        //:::  Worldwide cities and other features databases with latitude longitude  :::
        //:::  are available at http://www.geodatasource.com                          :::
        //:::                                                                         :::
        //:::  For enquiries, please contact sales@geodatasource.com                  :::
        //:::                                                                         :::
        //:::  Official Web site: http://www.geodatasource.com                        :::
        //:::                                                                         :::
        //:::               GeoDataSource.com (C) All Rights Reserved 2015            :::
        //:::                                                                         :::
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    this.distance = function (lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
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
