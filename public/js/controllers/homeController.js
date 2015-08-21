(function() {
    
  'use strict';

  angular
    .module('app')
    .controller('HomeController', controller);

  controller.$inject = ['$scope'];

  function controller($scope) {
    $scope.dropzoneConfig = { 
      autoProcessQueue: false,
      parallelUploads: 10,
      url: '/upload', 
      uploadMultiple: true,
      init: function() {
        this.on('successmultiple', function(e, result) { 
          console.log(e);
          console.log(result);
        })
      }
    };

    $scope.upload = function() {
      $scope.dropzone.processQueue();
    };

  }
})();