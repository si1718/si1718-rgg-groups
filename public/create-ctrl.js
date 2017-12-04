angular.module("GroupApp")
    .controller("CreateCtrl", ["$scope", "$http", "$location", function ($scope, $http,$location) {  // app.controller("name", dependencies)
        $scope.newGroup = {};
        $scope.newGroup.components = [];
        $scope.newGroup.linesOfInvestigation = [];
        $scope.newGroup['groupActivity-SICcodes'] = [];
        $scope.newGroup['generatedTechnology-SICcodes'] = [];
        $scope.newGroup.keywords = [];
        
        
        /**************************  START FUNCTION  *************************/
        function refresh() {
            $http
                .get("/api/v1/groups")
                .then(function (response) {
                    $scope.groups = response.data;
                });
        }
        /*********************************************************************/
        
        /*************************  ADD A NEW GROUP  *************************/
        $scope.addComponent = function () {
            $scope.newGroup.components.push($scope.newComponent);    
        }
        $scope.addLineOfInvestigation = function () {
            $scope.newGroup.linesOfInvestigation.push($scope.newLine);
        }    
        $scope.addActivity = function () {
            $scope.newGroup['groupActivity-SICcodes'].push($scope.newActivity);     
        }
        $scope.addTechnology = function () {
            $scope.newGroup['generatedTechnology-SICcodes'].push($scope.newTechnology);     
        }
        $scope.addKeyword = function () {
            $scope.newGroup.keywords.push($scope.newKeyword);    
        }
        
        $scope.addGroup = function () {
            $http
                .post("/api/v1/groups/", $scope.newGroup)
                .then(function (response) {
                    if(response.status == 201){
                      swal("Done!", "Group created!", "success");
                    }
                        refresh();
                        $location.path("/");
                    },
                    function(data) {
                        if(data.status == 409){
                          swal("Error!", "The group already exists!", "error");
                        }
                        if(data.status == 400){
                          swal("Error!", "Format of inserted data is incorrect!", "error");
                        }
                        if(data.status == 500){
                            swal("Error!", "Error creating data in the database!", "error");
                        }
                    }
                );
        };
        /*********************************************************************/
    }]);