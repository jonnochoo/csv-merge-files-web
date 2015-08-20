angular.module('app', ['ngRoute', 'ngDropzone'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/',
      templateUrl: '/views/home.html',
      controller: 'HomeController'
    });
  }]);