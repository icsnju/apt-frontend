'use strict';

angular.module('aptWebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('submit', {
        url: '/submit',
        templateUrl: 'app/submit/submit.html',
        controller: 'SubmitCtrl'
      });
  });
