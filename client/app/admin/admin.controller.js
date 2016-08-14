(function () {
angular.module('notinphillyServerApp')
  .controller('AdminController', [ '$scope', '$location', 'sessionService', function($scope, $location, sessionService) {

  	// track location 
    $scope.url = $location.url();

    $scope.$on('$locationChangeStart', function(event) {
        $scope.url = $location.url();
    });

    sessionService.checkLoggedin()
                  .then(function() {
                    $scope.isUserAdmin = sessionService.isAdmin();
                  },
                  function() {
                    $scope.isUserAdmin = false;
                  });

  }]);
})();
