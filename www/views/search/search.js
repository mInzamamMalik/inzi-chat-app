/**
 * Created by malikasinger on 19/08/2015.
 */
angular.module("starter")

  .controller('searchController', function ($rootScope, $scope, universalService, usersService,$ionicScrollDelegate /*,$http, $ionicLoading, $ionicPopup, $timeout*/) {



    $scope.ref.child("userProfiles").on("value", function (snap) {

      $scope.authData = universalService.authData;
      $scope.userlist = [];

      $rootScope.ref.child("userProfiles").on("child_added", function (snapShot) {

        //$rootScope.ref.child("userProfiles").child(snapShot.key()).child("loggedIn").update({ status : null});
        $scope.userlist.push(snapShot.val());
        $scope.$apply();
      });

    });


    $scope.logout = function () {
      universalService.logout();
    };



  });

