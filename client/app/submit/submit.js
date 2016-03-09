'use strict';

angular.module('aptWebApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('submit', {
        url: '/submit',
        templateUrl: 'app/submit/submit.html',
        controller: 'SubmitCtrl'
      })
      .state('submit.frame', {
        url: '/frame',
        templateUrl: 'app/submit/submit-frame.html'
      })
      .state('submit.selector', {
        url: '/selector',
        templateUrl: 'app/submit/submit-selector.html'
      })
      .state('submit.ok', {
        url: '/ok',
        templateUrl: 'app/submit/submit-ok.html'
      });
  });
