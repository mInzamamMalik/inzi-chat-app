/**
 * Created by malikasinger on 19/08/2015.
 */
angular.module("starter")

  .controller('homeController', function ($scope, universalService /*,$http, $ionicLoading, $ionicSideMenuDelegate, $ionicPopup, $timeout*/) {


    $scope.authWithFacebook = function () {
      universalService.authWithFacebook()
    }


    // Now what happens when you want to retrieve
    // all the comments associated with a particular link

    //var commentsRef = new Firebase("https://malikasinger-practiceapp.firebaseio.com/comments");
    //var linkRef = new Firebase("https://malikasinger-practiceapp.firebaseio.com/links");
    //
    //var LCommentsRef = linkRef.child("link1").child("comments");
    //
    //LCommentsRef.on("child_added", function (snap) {
    //  commentsRef.child(snap.key()).once("value", function (snap) {
    //    // Render the comment on the link page.
    //    console.log("this is a comment",snap.val());
    //  });
    //});


  });

