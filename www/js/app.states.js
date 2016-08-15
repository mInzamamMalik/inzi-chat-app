angular.module('starter')
  .config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "views/home/home.html",
      controller: "homeController"
    })
    .state("dashboard", {
      url: "/dashboard",
      templateUrl: "views/dashboard/dashboard.html",
      controller: "dashboardController"
    })
    .state("inbox", {
      url: "/inbox:recipientUid",
      templateUrl: "views/inbox/inbox.html",
      controller: "inboxController"
    })
    .state("chatDetail", {
      url: "/chatDetail",
      templateUrl: "views/chatDetail/chatDetail.html",
      controller: "chatDetailController"
    })
    .state("search", {
      url: "/search",
      templateUrl: "views/search/search.html",
      controller: "searchController"
    });

  $urlRouterProvider.otherwise("/home");

})
