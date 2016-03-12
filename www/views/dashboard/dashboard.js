/**
 * Created by malikasinger on 19/08/2015.
 */
angular.module("starter")

  .controller('dashboardController', function ($rootScope, $scope, universalService, usersService /*,$http, $ionicLoading, $ionicSideMenuDelegate, $ionicPopup, $timeout*/) {

    $scope.authData = universalService.authData;

    $rootScope.ref.on("value", function (snapShot) {
      $scope.userlist = snapShot.val();
      $scope.$apply();
      console.log("under dashboard 0",$scope.userlist);
    });




    $scope.logout = function () {
      universalService.logout();
    }


  });

