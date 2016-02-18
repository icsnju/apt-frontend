'use strict';

(function() {

  class TableController {

    constructor($scope, $http) {
      $scope.jobs = [];

      $http.get('/api/jobs').then(response => {
        if (response) {
          $scope.jobs = response.data;
        }
      });
    }
  }

  angular.module('aptWebApp')
    .controller('TableCtrl', TableController);

})();
