angular.module("GroupApp")
    .controller("SearchCtrl", ["$scope", "$http", "$window",
        function ($scope, $http, $window) {  // app.controller("name", dependencies)
        
        function refresh(request){
            $http
            .get("/api/v1/groups", {"params": $scope.search})
            .then(function(response){
                $scope.groups = response.data;
            },function(data) {
                if(data.status == 404){
                    swal("Error!", "Groups not found!", "error");
                }
            });
        }
        
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
        
        /*********************  UPDATE AN EXISTENT GROUP  ********************/
        $scope.editGroup = function (idGroup){
            $window.location.href = "#!/group/" + idGroup;
        }
        /*********************************************************************/
        
        /*********************  SEARCH AN EXISTENT GROUP  ********************/
        $scope.searchGroups = function (){
        
            let request ="?";
    
            if($scope.search.scientificTechnicalArea){
                request += "&scientificTechnicalArea=" + $scope.search.scientificTechnicalArea;
            }
            if($scope.search.name){
                request += "&name=" + $scope.search.name;
            }
            if($scope.search.idGroup){
                request += "&idGroup=" + $scope.search.idGroup;
            }
            if($scope.search.leader){
                request += "&leader=" + $scope.search.leader;
            }
            if($scope.search.phone){
                request += "&phone=" + $scope.search.phone;
            }
            if($scope.search.components){
                request += "&components=" + $scope.search.components;
            }
            if($scope.search.linesOfInvestigation){
                request += "&linesOfInvestigation=" + $scope.search.linesOfInvestigation;
            }
            if($scope.search['groupActivity-SICcodes']){
                request += "&groupActivity-SICcodes=" + $scope.search['groupActivity-SICcodes'];
            }
            if($scope.search['generatedTechnology-SICcodes']){
                request += "&generatedTechnology-SICcodes=" + $scope.search['generatedTechnology-SICcodes'];
            }
                
            refresh(request);
        }
        /*********************************************************************/
        
        
    }
]);