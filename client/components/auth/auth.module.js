'use strict';

angular.module('aptWebApp.auth', [
  'aptWebApp.constants',
  'aptWebApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
