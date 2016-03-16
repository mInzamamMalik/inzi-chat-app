/**
 * Created by malikasinger on 19/08/2015.
 */
angular.module("starter")

  .controller('inboxController', function ($scope, universalService, usersService, $stateParams , $rootScope) {



    $scope.recipientUid = $stateParams.recipientUid;
    $scope.myUid = usersService.myUid();

    $scope.myMessageRef = $rootScope.ref.child($scope.myUid);
    $scope.recepientMessageRef = $rootScope.ref.child($scope.recipientUid);


    console.log("recepient uid:", $scope.recipientUid);
    console.log("my uid:", $scope.myUid);


    $scope.sendMessage = function (from, to, text) {
      console.log(from, to, text);




      //{
      //  from: from,
      //  to: to,
      //  text: text
      //}


    }


  });
