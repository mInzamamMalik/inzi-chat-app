/**
 * Created by malikasinger on 19/08/2015.
 */
angular.module("starter")

  .controller('chatDetailController', function ($scope,universalService /*,$http, $ionicLoading, $ionicSideMenuDelegate, $ionicPopup, $timeout*/) {

    $scope.authData = universalService.authData;



    $scope.logout = function(){

      universalService.logout();

    }
  });

