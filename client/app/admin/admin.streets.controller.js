(function () {
angular.module('notinphillyServerApp')
  .controller('AdminStreetsController', [ '$scope', '$http', 'sessionService', function($scope, $http, sessionService) {
    console.log('streets controllelr');
    var paginationOptions = {
     pageNumber: 1,
     pageSize: 25,
     sort: null
   };

   $scope.gridOptions = {
     paginationPageSizes: [25, 50, 75],
     paginationPageSize: 25,
     useExternalPagination: true,
     useExternalSorting: true,
     columnDefs: [
       { name: 'firstName', enableSorting: false },
       { name: 'lastName', enableSorting: false },
     ],
     onRegisterApi: function(gridApi) {
       $scope.gridApi = gridApi;
       gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
         paginationOptions.pageNumber = newPage;
         paginationOptions.pageSize = pageSize;
         getPage();
       });
     }
   };

   var getPage = function(pageNumber, pageSize) {
     var url = "/api/users/paged?pageNumber=" + pageNumber + "&pageSize=" + pageSize;

     $http.get(url).success(function (data) {
         $scope.gridOptions.totalItems = data.count;
         $scope.gridOptions.data = data.users;
       });
   };

   getPage(1, 25);
  }]);
})();
