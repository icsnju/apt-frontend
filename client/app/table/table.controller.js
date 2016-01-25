'use strict';

angular.module('aptWebApp')
  .controller('TableCtrl', function($scope, $http) {
    // $scope.jobs = [{
    //   id: "1",
    //   start_time: "111",
    //   frame: "2222",
    //   filter: "3333",
    //   process: "30"
    // }, {
    //   id: "1",
    //   start_time: "111",
    //   frame: "2222",
    //   filter: "3333",
    //   process: "30"
    // }, {
    //   id: "1",
    //   start_time: "111",
    //   frame: "2222",
    //   filter: "3333",
    //   process: "30"
    // }];
    $http.get('api/job').then(response => {
      $scope.jobs = response.data;
    });

  });
