'use strict';

angular.module('aptWebApp')
  .controller('SubmitCtrl', function($scope, $http) {

    //get devices from server
    $scope.devices = [];
    $http.get('/api/devices').then(response => {
      if (response) {
        $scope.devices = response.data;
      }
    });

  });
