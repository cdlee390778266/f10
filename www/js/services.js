angular.module('starter.services', [])

.factory('Utils', function($http, $ionicPopup, $location, $ionicLoading, $timeout, $state) {

  //工具类对象
  var Utils = {};

  /**
   * [showPop 加载中]
   * @param  {[type]} template [配置参数对象， 如为空则采用默认模板]
   */
  Utils.showPop = function(template) {
    //默认模板
    var defaultTemplate = {
      template: '<ion-spinner icon="android"></ion-spinner>'
    }
    var template = template ? template : defaultTemplate;

    if (template.duration != undefined) {
      $timeout(function() {
        template.callback != undefined ? template.callback() : '';
      }, template.duration)
    }

    $ionicLoading.show(template);
  };

  /**
   * [hidePop 隐藏加载弹窗]
   */
  Utils.hidePop = function() {
    $ionicLoading.hide();
  };

  /**
   * [getJSON 获取数据]
   * @param  {[type]} url             [地址]
   * @param  {[type]} params            [参数]
   * @param  {[type]} successCallback [成功回调]
   * @param  {[type]} errorCallback   [失败回调]
   */
  Utils.getJSON = function(url, params, successCallback, errorCallback, tag) {

      if(!url)  return;
      
      $http({
        method: 'get',
        url: url,
        params: params
      }).then(function success(response) {
              // 请求成功执行代码
              successCallback ? successCallback(response, tag) : '';
              Utils.hidePop();
          }, function error(response) {
              // 请求失败执行代码
              if(errorCallback) {
                errorCallback(response, tag);
              }else {
                Utils.showAlert('获取数据失败，请检查网络！');
                Utils.hidePop();
              }
      });
    };

    //  alert（警告） 对话框
    Utils.showAlert = function(mes) {
      var alertPopup = $ionicPopup.alert({
        title: '提示',
        template: mes ? mes : ''
      });
    };

    return Utils;
});
