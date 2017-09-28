angular.module('starter.services', [])

.factory('Utils', function($http, $ionicPopup, $location, $ionicLoading, $timeout, $state) {

  //工具类对象
  var Utils = {};

  /**
   * [getJSON 获取数据]
   * @param  {[type]} url             [地址]
   * @param  {[type]} params            [参数]
   * @param  {[type]} successCallback [成功回调]
   * @param  {[type]} errorCallback   [失败回调]
   */
  Utils.getJSON = function(url, params, successCallback, errorCallback) {

      if(!url)  return;
      
      $http({
        method: 'get',
        url: url,
        params: params
      }).then(function success(response) {
              // 请求成功执行代码
              successCallback ? successCallback(response) : '';

          }, function error(response) {
              // 请求失败执行代码
              errorCallback ? errorCallback(response) : '';
      });
    };

    return Utils;
});
