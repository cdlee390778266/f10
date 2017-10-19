angular.module('starter.controllers', [])

.controller('DscCtrl', function($scope, Utils) {
  
  $scope.init = function() {

    //初始化数据
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

    // Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_ZYZB&code=AAPL&param=', 'index', $scope);
    // Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_GSZL&code=AAPL&param=', 'cmp', $scope);
    // Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_FHCF&code=AAPL&param=', 'abs', $scope);
    // Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_GBGD&code=AAPL&param=', 'shd', $scope);

    Utils.getData('data/tab-dsc-index.json', 'index', $scope);
    Utils.getData('data/tab-dsc-cmp.json', 'cmp', $scope);
    Utils.getData('data/tab-dsc-abs.json', 'abs', $scope);
    Utils.getData('data/tab-dsc-shd.json', 'shd', $scope);
  }

  $scope.init();

})

.controller('DscAbsCtrl', function($scope, $stateParams, Utils) {
 
  $scope.init = function() {

    //初始化数据
    $scope.fhLoading = {
      loading: true,
      showIcon: true,
      showError: false
    }

    $scope.gfLoading = {
      loading: true,
      showIcon: true,
      showError: false
    }

    // Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_FHCF_FHPX&code=AAPL&param=', 'fh', $scope);
    // Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_FHCF_GFCF&code=AAPL&param=', 'gf', $scope);

    Utils.getData('data/dsc-abs-fh.json', 'fh', $scope);
    Utils.getData('data/dsc-abs-gf.json', 'gf', $scope);
  }

  $scope.init();

})

.controller('DscShdCtrl', function($scope, $stateParams, Utils) {
  
  $scope.init = function() {

    //初始化数据
    $scope.gsLoading = {
      loading: true,
      showIcon: true,
      showError: false
    }

    $scope.jgcgLoading = {
      loading: true,
      showIcon: true,
      showError: false
    }

    $scope.jjcgLoading = {
      loading: true,
      showIcon: true,
      showError: false
    }

    // Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_GBGD_GBGD&code=AAPL&param=', 'gb', $scope);

    Utils.getData('data/dsc-shd-gb-gs.json', 'gs', $scope);
    Utils.getData('data/dsc-shd-gb-jgcg.json', 'jgcg', $scope);
    Utils.getData('data/dsc-shd-gb-jjcg.json', 'jjcg', $scope);
  }

  $scope.init();

})

.controller('FinanceCtrl', function($scope, Utils) {
  
  $scope.init = function() {

    //初始化数据
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

    // Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_CW&code=AAPL&param=', 'profit', $scope);
    // Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_CW&code=AAPL&param=', 'lbt', $scope);
    // Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_CW&code=AAPL&param=', 'flow', $scope);

    Utils.getData('data/finance-data-profit.json', 'profit', $scope);
    Utils.getData('data/finance-data-lbt.json', 'lbt', $scope);
    Utils.getData('data/finance-data-flow.json', 'flow', $scope);
  }
  
  $scope.init();

})

.controller('FiDetailCtrl', function($scope, $ionicScrollDelegate, $stateParams, Utils) {
  $scope.activeIndex = 0; //设置默认激活
  $scope.tdWidth = 130; //单元格宽度
  $scope.showNums= 2;

  // $scope.len = $scope.item.

  $scope.refresh = function() {
   
    // if($scope.tdWidth * ($scope.showNums + 1) < window.innerWidth) {
    //   //$scope.showNums = Math.floor(window.innerWidth)  
    //   $scope.tdWidth = window.innerWidth / ($scope.showNums + 1);
    // }else {
    //   $scope.showNums = Math.floor(window.innerWidth / $scope.tdWidth) - 1;
    //   $scope.tdWidth = window.innerWidth / ($scope.showNums + 1);
    // }
    // if() {

    // }
    if(window.innerWidth > ($scope.item.tHead.length) * $scope.tdWidth) {
      $scope.tdWidth = window.innerWidth / $scope.item.tHead.length;
    }
    $scope.showNums = Math.floor(window.innerWidth / $scope.tdWidth) - 1;
    $scope.tdWidth = window.innerWidth / ($scope.showNums + 1);

    $scope.headWr = $scope.tdWidth * $scope.showNums + 'px';
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
