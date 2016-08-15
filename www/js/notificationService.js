angular.module('starter')

  .service("notificationService", function ($ionicPopup, $ionicLoading) {
    this.showLoading = function (text) {
      $ionicLoading.show({
        template: text
      });
    };
    this.hideLoading = function () {
      $ionicLoading.hide();
    };
    this.showAlert = function (title, template) {
      $ionicPopup.alert({
        title: title,
        template: template
      });
    };

    this.showConfirm = function (title, template, onTrue, onFalse) {
      var confirmPopup = $ionicPopup.confirm({
        title: title,
        template: template

      }).then(function (res) {
        if (res) {
          onTrue();
        } else {
          onFalse();
        }
      });
    };
  });
