angular.module('starter.controllers', [])

.controller('DscCtrl', function($scope, Utils) {
  
  $scope.indexLoading = {
    loading: true,
    showIcon: true,
    showError: false
  }

  $scope.cmpLoading = {
    loading: true,
    showIcon: true,
    showError: false
  }

  $scope.absLoading = {
    loading: true,
    showIcon: true,
    showError: false
  }

  $scope.shdLoading = {
    loading: true,
    showIcon: true,
    showError: false
  }

  $scope.getDataSuccess = function(res, tag) {
    var res = res.data;
    if(parseInt(res.resultdata)) {
      $scope[tag+'Data'] = res.ResData;
      $scope[tag+'Loading'].loading = false;
      $scope[tag+'Loading'].showIcon = false;
      $scope[tag+'Loading'].showError = false;
    }else {
      $scope[tag+'Loading'].loading = true;
      $scope[tag+'Loading'].showIcon = false;
      $scope[tag+'Loading'].showError = true;
    }
  }

  $scope.getDataError = function(res, tag) {
    $scope[tag+'Loading'].loading = true;
    $scope[tag+'Loading'].showIcon = false;
    $scope[tag+'Loading'].showError = true;
  }

  $scope.getData = function(url, tag) {
    Utils.getJSON(url, '', $scope.getDataSuccess, $scope.getDataError, tag);
  }
  
  $scope.init = function() {
    $scope.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_ZYZB&code=AAPL&param=', 'index');
    $scope.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_GSZL&code=AAPL&param=', 'cmp');
    $scope.getData('data/tab-dsc-abs.json', 'abs');
    $scope.getData('data/tab-dsc-shd.json', 'shd');
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
  $scope.profitLoading = {
    loading: true,
    showIcon: true,
    showError: false
  }

  $scope.lbtLoading = {
    loading: true,
    showIcon: true,
    showError: false
  }

  $scope.flowLoading = {
    loading: true,
    showIcon: true,
    showError: false
  }

  $scope.getDataSuccess = function(res, tag) {
    var res = res.data;
    if(parseInt(res.resultdata)) {
      $scope[tag+'Data'] = res.ResData;
      $scope[tag+'Loading'].loading = false;
      $scope[tag+'Loading'].showIcon = false;
      $scope[tag+'Loading'].showError = false;
    }else {
      $scope[tag+'Loading'].loading = true;
      $scope[tag+'Loading'].showIcon = false;
      $scope[tag+'Loading'].showError = true;
    }
  }

  $scope.getDataError = function(res, tag) {
    $scope[tag+'Loading'].loading = true;
    $scope[tag+'Loading'].showIcon = false;
    $scope[tag+'Loading'].showError = true;
  }

  $scope.getData = function(url, tag) {
    Utils.getJSON(url, '', $scope.getDataSuccess, $scope.getDataError, tag);
  }
  
  $scope.init = function() {
    $scope.getData('data/finance-data-profit.json', 'profit');
    $scope.getData('data/finance-data-lbt.json', 'lbt');
    $scope.getData('data/finance-data-flow.json', 'flow');
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
