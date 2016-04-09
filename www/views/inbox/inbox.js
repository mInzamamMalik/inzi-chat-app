/**
 * Created by malikasinger on 19/08/2015.
 */
angular.module("starter")

  .controller('inboxController', function ($scope, $firebaseArray,notificationService,
                                           universalService, usersService, $stateParams,
                                           $rootScope, $ionicScrollDelegate, $ionicHistory) {


    $scope.recipientUid = $stateParams.recipientUid;
    $scope.myUid = usersService.myUid();

    $scope.myMessageRef = $rootScope.ref.child("inbox").child($scope.myUid).child($scope.recipientUid);
    $scope.recepientMessageRef = $rootScope.ref.child("inbox").child($scope.recipientUid).child($scope.myUid);

    var recipientNotificationRef = $rootScope.ref.child("notifications").child($scope.recipientUid).child($scope.myUid).child("newMessages");
    var myNotificationRef = $rootScope.ref.child("notifications").child($scope.myUid).child($scope.recipientUid).child("newMessages");

    //clear my notifications for me
    var makeNotificationNull = function () {
      myNotificationRef.set(null);
      console.log("removed");
    };
    makeNotificationNull();

    //increment one in recipient notification
    var notificationInc = function () {

      //var notificationRef = $rootScope.ref.child($scope.recipientUid).child("notification/newMessages").child($scope.myUid);
      var notificationcount = null;

      recipientNotificationRef.once("value", function (snapshot) {
        notificationcount = snapshot.val();

        //null from firebase on no previous data is handled by if statment
        if (notificationcount) notificationcount++;
        else notificationcount = 1;

        //then save this notification value to firabase
        recipientNotificationRef.set(notificationcount);
      });
    };


    ///////////////////////////////////////////////////////////////
    var recepientProfileRef = $rootScope.ref.child("userProfiles").child($scope.recipientUid);
    recepientProfileRef.once("value", function (snap) {
      $scope.recepientProfile = snap.val();
      //console.log($scope.recepientProfile);
      $scope.$apply();
    });
    ///////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////
    var myProfileRef = $rootScope.ref.child("userProfiles").child($scope.myUid);
    myProfileRef.once("value", function (snap) {
      $scope.myProfile = snap.val();
      //console.log($scope.myProfile);
      $scope.$apply();
    });
    ///////////////////////////////////////////////////////////////


    console.log("recepient uid:", $scope.recipientUid);
    console.log("my uid:", $scope.myUid);


//////////////////send message started///////////////////////////////////////////////////////////////////////////////
    $scope.sendMessage = function (image) {

      makeNotificationNull();

      $scope.myMessageRef.push().set({
        from: $scope.myUid,
        to: $scope.recipientUid,
        text: $scope.messageText || null,
        image: image || null,
        timeStamp: Firebase.ServerValue.TIMESTAMP
      });
      $scope.recepientMessageRef.push().set({
        from: $scope.myUid,
        to: $scope.recipientUid,
        text: $scope.messageText || null,
        image: image || null,
        timeStamp: Firebase.ServerValue.TIMESTAMP

      }, function(error) {

          if (error) {
            //alert("Data could not be saved." + error);
          } else {
            //alert("Data saved successfully.");
            notificationInc();
          }

      });

      $scope.messageText = "";

    };
//////////////////send message ended///////////////////////////////////////////////////////////////////////////////

    //////////////clear chat/////////////////////////////////////////////
    $scope.clearChat= function(){
      notificationService.showConfirm("Are You Sure??","do you really want to delete all chat histroy? <br /> you can also drag a message to left for single delete",function(){
        //on true
        $scope.recepientMessageRef.set(null);
      },function(){
        //on false
      })
    }
    //////////////clear chat/////////////////////////////////////////////


    $scope.inboxMessagesRef = $rootScope.ref.child("inbox").child($scope.myUid).child($scope.recipientUid);

    $scope.messageList = $firebaseArray($scope.inboxMessagesRef.limitToLast(10));
    $scope.inboxMessagesRef.on("child_added", function () {
      if ($ionicHistory.currentView().stateName == "inbox") {
        console.log($ionicHistory.currentView());
        $ionicScrollDelegate.scrollBottom();
      }

    });

    //this function will click on browse button which is hidden in UI
    $scope.uploadImage = function () {
      document.getElementById("file-input").addEventListener('change', uploadImageToFirebase, false);
      document.getElementById("file-input").click();
    };

    //this function will start image uploading to firebase instantly
    function uploadImageToFirebase(event) {
      var filename = event.target.files[0];
      var fr = new FileReader();
      fr.readAsDataURL(filename);
      fr.onload = function (res) {

        //ImgObj.image = res.target.result;
        $scope.sendMessage(res.target.result);

      };


    }


  });

