'use strict';

angular.module('aptWebApp')
  .controller('SubmitCtrl', function($scope, $http, Upload,$state) {

    //init
    $scope.submitted = false;
    $scope.submitok=false;
    $scope.devices = [];
    $scope.monkey = [];
    $scope.monkey.selected = true;


    //get devices from server
    $http.get('/api/devices').then(response => {
      if (response) {
        $scope.devices = response.data;
        for (var i = 0; i < $scope.devices.length; i++) {
          $scope.devices[i].check = false;
        }
      }
    });

    //submit this job
    $scope.submitJob = function() {
      $scope.submitted = true;

      if (!($scope.req.arg.$error.required || $scope.req.pkg.$error.required || $scope.req.file.$error.required)) {

        //get all selected devices
        var idList = [];
        var devices = $scope.devices;
        for (var i = 0; i < devices.length; i++) {
          if (devices[i].check) {
            idList.push(devices[i].Id);
          }
        }
        if (idList.length <= 0) {
          $scope.monkey.selected = false;
          return;
        }

        //create SubJob struct
        var SubJob = {};
        SubJob.FrameKind = 'monkey';
        SubJob.Frame = {};
        SubJob.Frame.AppPath = $scope.monkey.file.name;
        SubJob.Frame.PkgName = $scope.monkey.pkg;
        SubJob.Frame.Argu = $scope.monkey.arg;
        SubJob.FilterKind = 'specify_devices';
        SubJob.Filter = {};
        SubJob.Filter.IdList = idList;

        //submit requirement and files to server
        Upload.upload({
          url: '/api/jobs',
          method: 'POST',
          data: {
            file: $scope.monkey.file,
            job: SubJob
          }
        }).then(function(resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
          $scope.submitok=true;
          $state.go('table');
        }, function(resp) {
          console.log('Error status: ' + resp.status);
        }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

      }
    }

  });
