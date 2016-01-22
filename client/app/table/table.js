'use strict';

angular.module('aptWebApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('table', {
        url: '/table',
        templateUrl: 'app/table/table.html',
        controller: 'TableCtrl'
      });
  });
