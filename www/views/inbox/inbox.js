/**
 * Created by malikasinger on 19/08/2015.
 */
angular.module("starter")

  .controller('inboxController', function ($scope, $firebaseArray, universalService, usersService, $stateParams, $rootScope ) {


    $scope.recipientUid = $stateParams.recipientUid;
    $scope.myUid = usersService.myUid();

    $scope.myMessageRef = $rootScope.ref.child($scope.myUid).child("inbox").child($scope.recipientUid);
    $scope.recepientMessageRef = $rootScope.ref.child($scope.recipientUid).child("inbox").child($scope.myUid);




    console.log("recepient uid:", $scope.recipientUid);
    console.log("my uid:", $scope.myUid);


    $scope.sendMessage = function ( text) {
      console.log( text);


      $scope.myMessageRef.push().set({
        from: $scope.myUid ,
        to: $scope.recipientUid,
        text: text
      });
      $scope.recepientMessageRef.push().set({
        from: $scope.myUid ,
        to: $scope.recipientUid,
        text: text
      } );

    }


    $scope.inboxMessagesRef = $rootScope.ref.child($scope.myUid).child("inbox").child($scope.recipientUid);



      $scope.messageList = $firebaseArray($scope.inboxMessagesRef);



  });

