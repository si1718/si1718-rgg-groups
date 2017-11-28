angular.module("GroupApp")
    .controller("SearchCtrl", ["$scope", "$http", "$window",
        function ($scope, $http, $window) {  // app.controller("name", dependencies)
        
        function refresh(request){
            $http
            .get("/api/v1/departments/search"+request)
            .then(function(response){
                $scope.departments = response.data;
            });
        }
        
        /*********************  DELETE AN EXISTENT GROUP  ********************/
        $scope.deleteGroup = function (idGroup) {
            $http
                .delete("/api/v1/groups/" + idGroup)
                .then(function (response) {
                    refresh();
                });
        };
        /*********************************************************************/
        
        /*********************  UPDATE AN EXISTENT GROUP  ********************/
        $scope.editGroup = function (idDepartment){
            $window.location.href = "#!/group/" +idDepartment;
        }
        /*********************************************************************/
        
        /*********************  SEARCH AN EXISTENT GROUP  ********************/
        $scope.searchGroups = function (){
        
            let request ="?";
    
            if($scope.search.scientificTechnicalArea){
                request += "scientificTechnicalArea=" + ($scope.search.scientificTechnicalArea);
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
                request += "&web=" + $scope.search['generatedTechnology-SICcodes'];
            }
                
            refresh(request);
        }
        /*********************************************************************/
        
        
    }
]);