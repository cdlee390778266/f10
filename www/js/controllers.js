angular.module('starter.controllers', [])

.controller('DscCtrl', function($scope, Utils) {

  $scope.getDataSuccess = function(res) {
    var res = res.data;
    if(!parseInt(res.resultdata)) {
      $scope.items = res.ResData;
    }
  }

  $scope.getData = function() {
    Utils.showPop();
    Utils.getJSON('data/dsc-data.json', '', $scope.getDataSuccess);
  }
  
  $scope.init = function() {
    $scope.getData();
  }

  $scope.init();

})

.controller('DscAbsCtrl', function($scope, $stateParams, Utils) {
  
  $scope.getDataSuccess = function(res) {
    var res = res.data;
    if(!parseInt(res.resultdata)) {
      $scope.items = res.ResData;
    }
  }

  $scope.getData = function() {
    Utils.showPop();
    Utils.getJSON('data/dsc-abs.json', '', $scope.getDataSuccess);
  }
  
  $scope.init = function() {
    $scope.getData();
  }

  $scope.init();

})

.controller('DscShdCtrl', function($scope, $stateParams, Utils) {
  
  $scope.getDataSuccess = function(res) {
    var res = res.data;
    if(!parseInt(res.resultdata)) {
      $scope.items = res.ResData;
    }
  }

  $scope.getData = function() {
    Utils.showPop();
    Utils.getJSON('data/dsc-shd.json', '', $scope.getDataSuccess);
  }
  
  $scope.init = function() {
    $scope.getData();
  }

  $scope.init();

})

.controller('FinanceCtrl', function($scope, Utils) {
  $scope.getDataSuccess = function(res) {
    var res = res.data;
    if(!parseInt(res.resultdata)) {
      $scope.items = res.ResData;
    }
  }

  $scope.getData = function() {
    Utils.showPop();
    Utils.getJSON('data/finance-data.json', '', $scope.getDataSuccess);
  }
  
  $scope.init = function() {
    $scope.getData();
  }

  $scope.init();

})

.controller('FiDetailCtrl', function($scope, $ionicScrollDelegate, $stateParams, Utils) {
  $scope.activeIndex = 0; //设置默认激活
  $scope.tdWidth = 125; //单元格宽度

  $scope.refresh = function() {
    $scope.headW = $scope.tdWidth * $scope.item.tHead.length + 'px';
    $scope.bodyW = $scope.tdWidth * ($scope.item.tHead.length - 1) + 'px';
  }

  $scope.getDataSuccess = function(res) {
    var res = res.data;
    if(!parseInt(res.resultdata)) {
      $scope.items = res.ResData;
      $scope.item = $scope.items[$scope.activeIndex];
      $scope.refresh();
    }
  }

  $scope.getData = function() {
    var url = 'data/finance-detail.json';
    
    switch($stateParams.type) {
      case '0': url = 'data/finance-detail.json'; break;
      case '1': url = 'data/finance-detail1.json'; break;
      case '2': url = 'data/finance-detail2.json'; break;
      default: url = 'data/finance-detail.json'; break;
    }
    
    Utils.showPop();
    Utils.getJSON(url, '', $scope.getDataSuccess);
  }

  
  $scope.init = function() {
    $scope.getData();
    $scope.h=Math.min(document.documentElement.clientHeight,window.innerHeight)-44;
  }

  $scope.scrollRightHorizon=function(){
      var rightHandle = $ionicScrollDelegate.$getByHandle("rightContainerHandle");
      var headHandle = $ionicScrollDelegate.$getByHandle("headContainerHandle");
      var leftHandle = $ionicScrollDelegate.$getByHandle("leftContainerHandle");
      headHandle.scrollTo(rightHandle.getScrollPosition().left,0,false);
      leftHandle.scrollTo(0,rightHandle.getScrollPosition().top,false);
  }; 

  $scope.noScroll=function(){
      var headHandle = $ionicScrollDelegate.$getByHandle("headContainerHandle");
      headHandle.freezeScroll(true);
      var leftHandle = $ionicScrollDelegate.$getByHandle("leftContainerHandle");
      leftHandle.freezeScroll(true);
  };

  //切换 年度OR季度
  $scope.tab = function(index) {
    if($scope.activeIndex != index) {
      $scope.activeIndex = index;
      $scope.item = $scope.items[$scope.activeIndex];
      $scope.refresh();
    }
  }

  $scope.init();

});
