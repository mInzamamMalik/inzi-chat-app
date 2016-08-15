angular.module('starter')

  .service("usersService", function ($rootScope) {
    var vm = this;
    vm.userlist = "";

    vm.myUid = function () {
      //console.log("under service",$rootScope.ref.getAuth().uid);
      return $rootScope.ref.getAuth().uid;
    };

    //
    //$rootScope.ref.on("value", function (snapShot) {
    //  vm.userlist = snapShot.val();
    //  console.log("underservice", vm.userlist);
    //});

  });
