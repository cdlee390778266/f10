angular.module('starter.controllers', [])

.controller('DscCtrl', function($scope, $rootScope, Utils) {
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

    Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_ZYZB&code='+ $rootScope.code +'&param=', 'index', $scope);
    Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_GSZL&code='+ $rootScope.code +'&param=', 'cmp', $scope);
    Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_FHCF&code='+ $rootScope.code +'&param=', 'abs', $scope);
    Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_GBGD&code='+ $rootScope.code +'&param=', 'shd', $scope);
  }

  $scope.init();

})

.controller('DscAbsCtrl', function($scope, $rootScope, $stateParams, Utils) {
 
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

    Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_FHCF_FHPX&code='+ $rootScope.code +'&param=', 'fh', $scope);
    Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_FHCF_GFCF&code='+ $rootScope.code +'&param=', 'gf', $scope);
  }

  $scope.init();

})

.controller('DscShdCtrl', function($scope, $rootScope, $stateParams, Utils) {
  
  $scope.init = function() {

    //初始化数据
    $scope.gbLoading = {
      loading: true,
      showIcon: true,
      showError: false
    }

    Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_GBGD_GBGD&code='+ $rootScope.code +'&param=', 'gb', $scope);
  }

  $scope.init();

})

.controller('FinanceCtrl', function($scope, $rootScope, Utils) {
  
  $scope.init = function() {

    //初始化数据
    $scope.cwLoading = {
      loading: true,
      showIcon: true,
      showError: false
    }

    Utils.getData('/Dal/GetDataHandler.ashx?funType=F10_AM_CW&code='+ $rootScope.code +'&param=', 'cw', $scope);
  }
  
  $scope.init();

})

.controller('FiDetailCtrl', function($scope, $rootScope, $ionicScrollDelegate, $stateParams, Utils) {
  $scope.activeIndex = 0; //设置默认激活
  $scope.tdWidth = 130; //单元格宽度
  $scope.showNums= 2;
  $scope.item = {};
  $scope.items = [];
  $scope.obj = {};
  
  $scope.refresh = function() {
    if(window.innerWidth > ($scope.item.tHead.length) * $scope.tdWidth) {
      $scope.tdWidth = window.innerWidth / $scope.item.tHead.length;
    }
    $scope.showNums = Math.floor(window.innerWidth / $scope.tdWidth) - 1;
    $scope.tdWidth = window.innerWidth / ($scope.showNums + 1);

    $scope.headWr = $scope.tdWidth * $scope.showNums + 'px';
    $scope.headW = $scope.tdWidth * $scope.item.tHead.length + 1 + 'px';
    $scope.bodyW = $scope.tdWidth * ($scope.item.tHead.length) + 'px';
  }

  $scope.structData = function(data) {
    $scope.obj = {};
    $scope.obj.tHead = [];
    $scope.obj.tBody = [];
    $scope.obj.colNameArr = [];
    for (var i = 0; i < data.length; i++) {
      $scope.obj.tHead[i] = $scope.obj.tHead[i] ? $scope.obj.tHead[i] : [];
      $scope.obj.tHead[i][0] = data[i].EndDate;
      $scope.obj.tHead[i][1] = data[i].Currency;
      for (var j = 0; j < data[i].ITEM.length; j++) {
        if(!$scope.obj.colNameArr[j]) {
           $scope.obj.colNameArr[j] = [];
          $scope.obj.colNameArr[j][0] = data[i].ITEM[j].F001;
          $scope.obj.colNameArr[j][1] = true;
        }
        
        $scope.obj.tBody[j] = $scope.obj.tBody[j] ? $scope.obj.tBody[j] : [];
        $scope.obj.tBody[j][0] = $scope.obj.tBody[j][0] ? $scope.obj.tBody[j][0] : [];
        $scope.obj.tBody[j][1] = true;
        if(data[i].ITEM[j].F002 == '') {
          $scope.obj.colNameArr[j][1] = false;
          $scope.obj.tBody[j][1] = false;
        }

        $scope.obj.tBody[j][0].push(Number(data[i].ITEM[j].F002).toFixed(2) + data[i].ITEM[j].F003);
      }
    }
    return $scope.obj;
  }

  $scope.getDataSuccess = function(res) {
    var res = res.data;
    if(parseInt(res.resultdata)) {
      $scope.stkInfo = res.ResData.StkInfo;
      $scope.items[0] = $scope.structData(res.ResData.M_CW_MAIN.JDData);
      $scope.items[1] = $scope.structData(res.ResData.M_CW_MAIN.NDData);
      $scope.item = $scope.items[$scope.activeIndex];
      $scope.refresh();
    }
  }

  $scope.getData = function() {
    var url = '/Dal/GetDataHandler.ashx?funType=F10_AM_CW_LRB&code='+ $rootScope.code +'&param=';
    $scope.pageTitle = '利润表';
    
    switch($stateParams.type) {
      case '0': url = '/Dal/GetDataHandler.ashx?funType=F10_AM_CW_LRB&code='+ $rootScope.code +'&param='; $scope.pageTitle = '利润表'; break;
      case '1': url = '/Dal/GetDataHandler.ashx?funType=F10_AM_CW_ZCFZ&code='+ $rootScope.code +'&param='; $scope.pageTitle = '资产负债表'; break;
      case '2': url = '/Dal/GetDataHandler.ashx?funType=F10_AM_CW_XJLL&code='+ $rootScope.code +'&param='; $scope.pageTitle = '现金流量表'; break;
      default: url = '/Dal/GetDataHandler.ashx?funType=F10_AM_CW_LRB&code='+ $rootScope.code +'&param='; $scope.pageTitle = '利润表'; break;
    }
    
    Utils.showPop();
    Utils.getJSON(url, '', $scope.getDataSuccess);
  }

  
  $scope.init = function() {
    $scope.getData();
    $scope.h=Math.min(document.documentElement.clientHeight,window.innerHeight)-84;
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
