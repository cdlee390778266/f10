// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.filter'])

.run(function($ionicPlatform, $rootScope) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //获取查询代码
    var url = location.href;
    if(url.indexOf('_c=') != -1) {
      $rootScope.code = url.substring(url.indexOf('_c='), url.indexOf('#')).split('=')[1];
    }else {
      $rootScope.code = 'AAPL';
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.dsc', {
    url: '/dsc',
    views: {
      'tab-dsc': {
        templateUrl: 'templates/tab-dsc.html',
        controller: 'DscCtrl'
      }
    }
  })

  .state('tab.finance', {
      url: '/finance',
      views: {
        'tab-finance': {
          templateUrl: 'templates/tab-finance.html',
          controller: 'FinanceCtrl'
        }
      }
    })

  .state('dsc-abs', {
      url: '/dsc-abs',
      templateUrl: 'templates/dsc-abs.html',
      controller: 'DscAbsCtrl'
    })

  .state('dsc-shd', {
      url: '/dsc-shd',
      templateUrl: 'templates/dsc-shd.html',
      controller: 'DscShdCtrl'
    })

  .state('finance-detail', {
      url: '/finance-detail?:type',
      templateUrl: 'templates/finance-detail.html',
      controller: 'FiDetailCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dsc');

});
