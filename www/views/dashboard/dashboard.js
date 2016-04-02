/**
 * Created by malikasinger on 19/08/2015.
 */
angular.module("starter")

  .controller('dashboardController', function ($rootScope, $scope, universalService, usersService,$ionicScrollDelegate /*,$http, $ionicLoading, $ionicPopup, $timeout*/) {

    $rootScope.ref.child("userProfiles").child(universalService.authData.uid).on("value", function (snap) {
      $scope.myProfile = snap.val();
    });





    $scope.ref.child("userProfiles").on("value", function (snap) {

      $scope.authData = universalService.authData;
      $scope.userlist = [];

      $rootScope.ref.child("userProfiles").on("child_added", function (snapShot) {
        $scope.userlist.push(snapShot.val());
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

