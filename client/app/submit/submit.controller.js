'use strict';

angular.module('aptWebApp')
  .controller('SubmitCtrl', function($scope, $http, Upload) {

    //init
    $scope.submitted = false;
    $scope.rq = {};
    $scope.devices = [];


    //get devices from server
    $http.get('/api/devices').then(response => {
      if (response) {
        $scope.devices = response.data;
      }
    });

    //submit this job
    $scope.submitJob = function() {
      $scope.submitted = true;

      if (!($scope.req.arg.$error.required || $scope.req.pkg.$error.required || $scope.req.file.$error.required)) {

        //1.upload apk file
        Upload.upload({
          url: '/api/jobs',
          method: 'POST',
          data: {
            file: $scope.file,
            jobId: '1'
          }
        }).then(function(resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function(resp) {
          console.log('Error status: ' + resp.status);
        }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

      }
    }

  });
