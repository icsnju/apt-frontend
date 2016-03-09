'use strict';

angular.module('aptWebApp', [
    'aptWebApp.auth',
    'aptWebApp.admin',
    'aptWebApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'validation.match',
    'ngFileUpload',
    'ngAnimate'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
