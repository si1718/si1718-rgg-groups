angular.module("GroupApp")
    .controller("GrantCtrl", ["$scope", "$http", "$location", "$routeParams",
        function($scope, $http, $location, $routeParams){
        
        function refresh() {
            $http
                .get("https://si1718-flp-grants.herokuapp.com/api/v1/grants")
                .then(function (response) {
                    $scope.grants = response.data;
                },function(data) {
                    if(data.status == 404){
                        swal("Error!", "There aren´t grants in the database!", "error");
                    }
                }
            );
        }
        
        refresh();
}]);