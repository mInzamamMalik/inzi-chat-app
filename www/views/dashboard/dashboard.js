angular.module("starter")

  .controller('dashboardController', function ($rootScope, $scope, universalService, usersService, $ionicScrollDelegate /*,$http, $ionicLoading, $ionicPopup, $timeout*/) {

    $rootScope.ref.child("userProfiles").child(universalService.authData.uid).on("value", function (snap) {
      $scope.myProfile = snap.val();
    });

    $scope.userlist = {};
    $scope.ref.child("recentlyConnected").child(universalService.authData.uid).on("child_added", function (snap) {
      $rootScope.ref.child("userProfiles").child(snap.key()).on("value", function (snapShot) {
        $scope.userlist[snapShot.key()] = snapShot.val();
        $scope.$apply();
      });
    });

    $rootScope.ref.child("notifications").child(usersService.myUid()).on("value", function () {

      ////////////////this code will get notification/////////////////////////////////////////////////
      $scope.notificationList = [];
      var newNewMessageRef = $rootScope.ref.child("notifications").child(usersService.myUid());

      newNewMessageRef.on("child_added", function (snap) {
        console.log("abc", snap.val());

        if (snap.val()) {

          $rootScope.ref.child("userProfiles").child(snap.key()).once("value", function (userSnap) {
            userData = userSnap.val();
            userData.count = snap.val().newMessages;

            $scope.notificationList.push(userData);
            //console.log("abc",$scope.notificationList);

          })
        }
      });
      ////////////////this code will get notification/////////////////////////////////////////////////
      $scope.$apply();
    });

    $scope.logout = function () {
      universalService.logout();
    };

  });

