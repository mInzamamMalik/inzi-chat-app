/**
 * Created by malikasinger on 19/08/2015.
 */
angular.module("starter")

  .controller('inboxController', function ($scope, $firebaseArray, universalService, usersService, $stateParams, $rootScope, $ionicScrollDelegate) {


    $scope.recipientUid = $stateParams.recipientUid;
    $scope.myUid = usersService.myUid();

    $scope.myMessageRef = $rootScope.ref.child($scope.myUid).child("inbox").child($scope.recipientUid);
    $scope.recepientMessageRef = $rootScope.ref.child($scope.recipientUid).child("inbox").child($scope.myUid);

    var notificationRef = $rootScope.ref.child($scope.myUid).child("notification/newMessages").child($scope.recipientUid);

    var makeNotificationNull = function(){
      notificationRef.set(null);
      console.log("removed");
    };
    makeNotificationNull();


    ///////////////////////////////////////////////////////////////
    var recepientProfileRef = $rootScope.ref.child($scope.recipientUid);
    recepientProfileRef.once("value", function (snap) {
      $scope.recepientProfile = snap.val();
      //console.log($scope.recepientProfile);
      $scope.$apply();
    });
    ///////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////
    var myProfileRef = $rootScope.ref.child($scope.myUid);
    myProfileRef.once("value", function (snap) {
      $scope.myProfile = snap.val();
      //console.log($scope.myProfile);
      $scope.$apply();
    });
    ///////////////////////////////////////////////////////////////


    console.log("recepient uid:", $scope.recipientUid);
    console.log("my uid:", $scope.myUid);





//////////////////send message started///////////////////////////////////////////////////////////////////////////////
    $scope.sendMessage = function () {

      makeNotificationNull();

      $scope.myMessageRef.push().set({
        from: $scope.myUid,
        to: $scope.recipientUid,
        text: $scope.messageText,
        timeStamp: Firebase.ServerValue.TIMESTAMP
      });
      $scope.recepientMessageRef.push().set({
        from: $scope.myUid,
        to: $scope.recipientUid,
        text: $scope.messageText,
        timeStamp: Firebase.ServerValue.TIMESTAMP

      });

      ///////////////////////////////////////////////////////////////////////////////////////
      var notificationRef = $rootScope.ref.child($scope.recipientUid).child("notification/newMessages").child($scope.myUid);
      var notificationcount = null;

      notificationRef.once("value", function (snapshot) {

        notificationcount = snapshot.val();
        //console.log("noti", notificationcount);
        //increment one
        //null from firebase on no previous data is handled by if statment
        if (notificationcount) notificationcount++;
        else notificationcount = 1;

        //then save this notification value to firabase
        notificationRef.set(notificationcount);
      });
      ////////////////////////////////////////////////////////////////////////////////////

      $scope.messageText = "";

    };
//////////////////send message ended///////////////////////////////////////////////////////////////////////////////






    $scope.inboxMessagesRef = $rootScope.ref.child($scope.myUid).child("inbox").child($scope.recipientUid);

    $scope.messageList = $firebaseArray($scope.inboxMessagesRef);
    $scope.inboxMessagesRef.on("child_added", function () {
      $ionicScrollDelegate.scrollBottom();
    });


    $scope.uploadImage = function () {
      console.log("sdf");

      document.getElementById("file-input").addEventListener('change', uploadImageToFirebase, false);
      document.getElementById("file-input").click();
    }

    function uploadImageToFirebase(event) {
      var filename = event.target.files[0];
      var fr = new FileReader();

      fr.readAsDataURL(filename);


      fr.onload = function (res) {

        //ImgObj.image = res.target.result;

        $scope.myMessageRef.push().set({
            from: $scope.myUid,
            to: $scope.recipientUid,
            //text: $scope.messageText,
            image: res.target.result,
            timeStamp: Firebase.ServerValue.TIMESTAMP
          })

          .then(function (val) {

            $scope.recepientMessageRef.push().set({
              from: $scope.myUid,
              to: $scope.recipientUid,
              //text: $scope.messageText,
              image: res.target.result,
              timeStamp: Firebase.ServerValue.TIMESTAMP
            })


          }, function (error) {
            console.log("ERROR", error);
          })
      };


    }


  });

