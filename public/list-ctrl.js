angular.module("GroupApp")
    .controller("ListCtrl", ["$scope", "$http", function ($scope, $http) {  // app.controller("name", dependencies)
        /**************************  START FUNCTION  *************************/
        function refresh() {
            $http
                .get("/api/v1/groups")
                .then(function (response) {
                    $scope.groups = response.data;
                    $scope.url = false;
                    if ($scope.groups.leader.includes("https://") == true) {
                        $scope.url = true;
                    }
                },function(data) {
                    if(data.status == 404){
                        swal("Error!", "There aren´t groups in the database!", "error");
                    }
                }
            );
        }
        /*********************************************************************/
        
        /*********************  DELETE AN EXISTENT GROUP  ********************/
        $scope.deleteGroup = function (idGroup) {
            $http
                .delete("/api/v1/groups/" + idGroup)
                .then(function (response) {
                    if(response.status == 200){
                      swal("Deleted!", "Group deleted!", "success");
                    }
                    refresh();
                },function(data) {
                    if(data.status == 500){
                        swal("Error!", "Error deleting data from the database!", "error");
                    }
                }
            );
        };
        /*********************************************************************/
        
        refresh();
    }]);