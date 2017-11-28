angular.module("GroupApp")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location",
        function ($scope, $http, $routeParams, $location) {  // app.controller("name", dependencies)
            $scope.groupId = $routeParams.idGroup;
            console.log("EditCtrl initialized for group " + $scope.groupId);
                
            $http
                .get("/api/v1/groups/" + $scope.groupId)
                .then(function (response) {
                    $scope.oldGroup = response.data[0];
                    $scope.oldGroup.components = $scope.oldGroup.components.join();
                    $scope.oldGroup.linesOfInvestigation = $scope.oldGroup.linesOfInvestigation.join();
                    $scope.oldGroup['groupActivity-SICcodes'] = $scope.oldGroup['groupActivity-SICcodes'].join();
                    $scope.oldGroup['generatedTechnology-SICcodes'] = $scope.oldGroup['generatedTechnology-SICcodes'].join();
                });
            
            function refresh (){
                $http
                    .get("/api/v1/groups/" + $scope.groupId)
                    .then(function (response) {
                        $scope.updatedGroup = response.data[0];
                        /*$scope.upG = $scope.updatedGroup;
                        console.log($scope.upG.scientificTechnicalArea);*/
                    });
            }
            
            $scope.editGroup = function () {
                delete $scope.updatedGroup._id;
                var length = $scope.updatedGroup.components.length;
                var length1 = $scope.updatedGroup.linesOfInvestigation.length;
                var length2 = $scope.updatedGroup['groupActivity-SICcodes'].length;
                var length3 = $scope.updatedGroup['generatedTechnology-SICcodes'].length;
                
                if ($scope.oldGroup.components != $scope.updatedGroup.components && length > 0){
                    console.log("si");
                    $scope.updatedGroup1 = [];
                    var coma = 0;
                    var coma1 = [];
                    var coma2 = 0;
                    
                    for (var i1 = 0; i1 < length; i1++){
                        if ($scope.updatedGroup.components[i1] == ",") { coma = coma + 1; coma1.push(i1); }
                    }
                    
                    for (var i = 0; i < length; i++) {
                        if ($scope.updatedGroup.components[i] == "," || i == length-1) {
                            if (i == coma1[0]){
                                $scope.updatedGroup1.push($scope.updatedGroup.components.substr(0, i));
                                coma2 = i;
                            }
                            else{
                                $scope.updatedGroup1.push($scope.updatedGroup.components.substr(coma2+1, 2));
                                coma2 = i;
                            }
                        }
                    }
                    $scope.updatedGroup.components = [];
                    $scope.updatedGroup.components = $scope.updatedGroup1;
                }
                
                if ($scope.oldGroup.linesOfInvestigation != $scope.updatedGroup.linesOfInvestigation && length1 > 0){
                    $scope.updatedGroup1 = [];
                    var coma = 0;
                    var coma1 = [];
                    var coma2 = 0;
                    
                    for (var i1 = 0; i1 < length1; i1++){
                        if ($scope.updatedGroup.linesOfInvestigation[i1] == ",") { coma = coma + 1; coma1.push(i1); }
                    }
                    
                    for (var i = 0; i < length1; i++) {
                        if ($scope.updatedGroup.linesOfInvestigation[i] == "," || i == length1-1) {
                            if (i == coma1[0]){
                                $scope.updatedGroup1.push($scope.updatedGroup.linesOfInvestigation.substr(0, i));
                                coma2 = i;
                            }
                            else{
                                $scope.updatedGroup1.push($scope.updatedGroup.linesOfInvestigation.substr(coma2+1, 2));
                                coma2 = i;
                            }
                        }
                    }
                    $scope.updatedGroup.linesOfInvestigation = [];
                    $scope.updatedGroup.linesOfInvestigation = $scope.updatedGroup1;
                }
                
                if ($scope.oldGroup['groupActivity-SICcodes'] != $scope.updatedGroup['groupActivity-SICcodes'] && length2 > 0){
                    $scope.updatedGroup1 = [];
                    var coma = 0;
                    var coma1 = [];
                    var coma2 = 0;
                    
                    for (var i1 = 0; i1 < length2; i1++){
                        if ($scope.updatedGroup['groupActivity-SICcodes'][i1] == ",") { coma = coma + 1; coma1.push(i1); }
                    }
                    
                    for (var i = 0; i < length2; i++) {
                        if ($scope.updatedGroup['groupActivity-SICcodes'][i] == "," || i == length2-1) {
                            if (i == coma1[0]){
                                $scope.updatedGroup1.push($scope.updatedGroup['groupActivity-SICcodes'].substr(0, i));
                                coma2 = i;
                            }
                            else{
                                $scope.updatedGroup1.push($scope.updatedGroup['groupActivity-SICcodes'].substr(coma2+1, 2));
                                coma2 = i;
                            }
                        }
                    }
                    $scope.updatedGroup['groupActivity-SICcodes'] = [];
                    $scope.updatedGroup['groupActivity-SICcodes'] = $scope.updatedGroup1;
                }
                
                if ($scope.oldGroup['generatedTechnology-SICcodes'] != $scope.updatedGroup['generatedTechnology-SICcodes'] && length3 > 0){
                    $scope.updatedGroup1 = [];
                    var coma = 0;
                    var coma1 = [];
                    var coma2 = 0;
                    
                    for (var i1 = 0; i1 < length3; i1++){
                        if ($scope.updatedGroup['generatedTechnology-SICcodes'][i1] == ",") { coma = coma + 1; coma1.push(i1); }
                    }
                    
                    for (var i = 0; i < length3; i++) {
                        if ($scope.updatedGroup['generatedTechnology-SICcodes'][i] == "," || i == length3-1) {
                            if (i == coma1[0]){
                                $scope.updatedGroup1.push($scope.updatedGroup['generatedTechnology-SICcodes'].substr(0, i));
                                coma2 = i;
                            }
                            else{
                                $scope.updatedGroup1.push($scope.updatedGroup['generatedTechnology-SICcodes'].substr(coma2+1, 2));
                                coma2 = i;
                            }
                        }
                    }
                    $scope.updatedGroup['generatedTechnology-SICcodes'] = [];
                    $scope.updatedGroup['generatedTechnology-SICcodes'] = $scope.updatedGroup1;
                }
                    
                    $http
                        .put("/api/v1/groups/" + $scope.groupId, $scope.updatedGroup)
                        .then(function (response) {
                            if(response.status == 201){
                              swal("Done!", "Group edited!", "success");
                            }
                            console.log("Updated");
                            $location.path("/");
                        },function(data) {
                            if(data.status == 500){
                                swal("Error!", "Error editing data in the database!", "error");
                            }
                        }
                    );
                
            }
            refresh();
        }
    ]);