'use strict';

angular.module('aptWebApp')
  .controller('TableCtrl', function($scope) {
    $scope.jobs = [{
      id: "1",
      start_time: "111",
      frame: "2222",
      filter: "3333",
      process: "30"
    }, {
      id: "1",
      start_time: "111",
      frame: "2222",
      filter: "3333",
      process: "30"
    }, {
      id: "1",
      start_time: "111",
      frame: "2222",
      filter: "3333",
      process: "30"
    }];
  });
