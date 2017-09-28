angular.module('starter.controllers', [])

.controller('DscCtrl', function($scope, Utils) {

  $scope.index = {};

  $scope.getIndexSuccess = function(res) {
    var res = res.data;
    if(!parseInt(res.resultdata)) {
      $scope.index.name = res.ResData.title.name;
      $scope.index.tag = res.ResData.title.tag;
      $scope.index.data = res.ResData.data;
    }else {

    }
  }

  $scope.getIndexError = function(res) {
    
  }

  Utils.getJSON('data/dsc-data-index.json', '', $scope.getIndexSuccess, $scope.getIndexError);

})

.controller('FinanceCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
