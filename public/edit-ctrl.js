angular.module("GroupApp")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location",
        function ($scope, $http, $routeParams, $location) {  // app.controller("name", dependencies)
            $scope.groupId = $routeParams.idGroup;
            console.log("EditCtrl initialized for group " + $scope.groupId);
            var leader;
                
            $http
                .get("/api/v1/groups/" + $scope.groupId)
                .then(function (response) {
                    $scope.oldGroup = response.data[0];
                    $scope.oldGroup.components = $scope.oldGroup.components.join();
                    $scope.oldGroup.linesOfInvestigation = $scope.oldGroup.linesOfInvestigation.join();
                    $scope.oldGroup['groupActivity-SICcodes'] = $scope.oldGroup['groupActivity-SICcodes'].join();
                    $scope.oldGroup['generatedTechnology-SICcodes'] = $scope.oldGroup['generatedTechnology-SICcodes'].join();
                    $scope.oldGroup.keywords = $scope.oldGroup.keywords.join();
                });
            
            function refresh (){
                $http
                    .get("/api/v1/groups/" + $scope.groupId)
                    .then(function (response) {
                        $scope.updatedGroup = response.data[0];
                        
                        /***************RESEARCHERS***************/
                        console.log("longitud:" + $scope.updatedGroup.leader);
                        if($scope.updatedGroup.leader.length > 0){
                            leader = String($scope.updatedGroup.leader);
                        }else{
                            leader = String($scope.updatedGroup.leaderName);
                        }
                        
                        if(leader.includes("https://") == true){
                            $scope.muestraValida = false;
                            leader = $scope.updatedGroup.leaderName;
                        }else{
                            $scope.muestraValida = true; 
                        }
                        
                        $http
                            .get("https://si1718-dfr-researchers.herokuapp.com/api/v1/researchers?search=" + leader)
                            .then(function(response) {
                                $scope.researchers = response.data;
                                 if($scope.researchers.length > 0){
                                    $scope.leader = $scope.researchers[0];
                                    $scope.leaderName =  $scope.researchers[0].name;
                                }
                            });
                        /*****************************************/
                    });
            }
            
            $scope.validateGroup = function (){
                delete $scope.updatedGroup._id;
                
                if($scope.researchers.length > 0){
                    $scope.updatedGroup.leaderName = $scope.leader.name;
                    $scope.updatedGroup.leader = 'https://si1718-dfr-researchers.herokuapp.com/api/v1/researchers/'
                                                 + $scope.researchers[0].idResearcher;
                }

                $http
                    .put("/api/v1/groups/"+$scope.groupId, $scope.updatedGroup)
                    .then(function(response) {
                        console.log("updated");
                        //$location.reload();
                        refresh();
                    }, function(error){
                        if(String(error.status) != '200'){
                            switch (String(error.status)) {
                                case '422':
                                    $scope.error = "Please review the information entered in the fields";
                                    break;
                                default:
                                    $scope.error = "Error, please contact administrator";
                            }
                        }
                    });
            }
            
            $scope.changeGroup = function (){
                delete $scope.updatedGroup._id;
                $scope.updatedGroup.leader = $scope.updatedGroup.leaderName;
                $scope.updatedGroup.leaderName = "";
                
                $http
                    .put("/api/v1/groups/" + $scope.groupId, $scope.updatedGroup)
                    .then(function(response) {
                        console.log("updated");
                        refresh();
                        //$location.path("/group/" + $scope.groupId);
                        //$location.reload();
                    }, function(error){
                        if(String(error.status) != '200'){
                            switch (String(error.status)) {
                                case '422':
                                    $scope.error = "Please review the information entered in the fields";
                                    break;
                                default:
                                    $scope.error = "Error, please contact administrator";
                            }
                        }  
                    });
            }
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            $scope.editGroup = function () {
                delete $scope.updatedGroup._id;
                var length = $scope.updatedGroup.components.length;
                var length1 = $scope.updatedGroup.linesOfInvestigation.length;
                var length2 = $scope.updatedGroup['groupActivity-SICcodes'].length;
                var length3 = $scope.updatedGroup['generatedTechnology-SICcodes'].length;
                var length4 = $scope.updatedGroup.keywords.length;
                
                if ($scope.oldGroup.components != $scope.updatedGroup.components && length > 0){
                    $scope.updatedGroup1 = [];
                    var coma1 = [];
                    var coma2 = 0;
                    
                    for (var i1 = 0; i1 < length; i1++){
                        if ($scope.updatedGroup.components[i1] == ",") { coma1.push(i1); }
                    }
                    
                    for (var i = 0; i < length; i++) {
                        if ($scope.updatedGroup.components[i] == "," || i == length-1) {
                            if (i == coma1[0]){
                                $scope.updatedGroup1.push($scope.updatedGroup.components.substr(0, i));
                                coma2 = i;
                            }
                            else if (i == length-1){
                                $scope.updatedGroup1.push($scope.updatedGroup.components.substr(coma2+1, i-coma2));
                            }
                            else{
                                $scope.updatedGroup1.push($scope.updatedGroup.components.substr(coma2+1, i-coma2-1));
                                coma2 = i;
                            }
                        }
                    }
                    $scope.updatedGroup.components = [];
                    $scope.updatedGroup.components = $scope.updatedGroup1;
                }
                
                if ($scope.oldGroup.linesOfInvestigation != $scope.updatedGroup.linesOfInvestigation && length1 > 0){
                    $scope.updatedGroup1 = [];
                    var coma1 = [];
                    var coma2 = 0;
                    
                    for (var i1 = 0; i1 < length1; i1++){
                        if ($scope.updatedGroup.linesOfInvestigation[i1] == ",") { coma1.push(i1); }
                    }
                    
                    for (var i = 0; i < length1; i++) {
                        if ($scope.updatedGroup.linesOfInvestigation[i] == "," || i == length1-1) {
                            if (i == coma1[0]){
                                $scope.updatedGroup1.push($scope.updatedGroup.linesOfInvestigation.substr(0, i));
                                coma2 = i;
                            }
                            else if (i == length1-1){
                                $scope.updatedGroup1.push($scope.updatedGroup.linesOfInvestigation.substr(coma2+1, i-coma2));
                            }
                            else{
                                $scope.updatedGroup1.push($scope.updatedGroup.linesOfInvestigation.substr(coma2+1, i-coma2-1));
                                coma2 = i;
                            }
                        }
                    }
                    $scope.updatedGroup.linesOfInvestigation = [];
                    $scope.updatedGroup.linesOfInvestigation = $scope.updatedGroup1;
                }
                
                if ($scope.oldGroup['groupActivity-SICcodes'] != $scope.updatedGroup['groupActivity-SICcodes'] && length2 > 0){
                    $scope.updatedGroup1 = [];
                    var coma1 = [];
                    var coma2 = 0;
                    
                    for (var i1 = 0; i1 < length2; i1++){
                        if ($scope.updatedGroup['groupActivity-SICcodes'][i1] == ",") { coma1.push(i1); }
                    }
                    
                    for (var i = 0; i < length2; i++) {
                        if ($scope.updatedGroup['groupActivity-SICcodes'][i] == "," || i == length2-1) {
                            if (i == coma1[0]){
                                $scope.updatedGroup1.push($scope.updatedGroup['groupActivity-SICcodes'].substr(0, i));
                                coma2 = i;
                            }
                            else if (i == length2-1){
                                $scope.updatedGroup1.push($scope.updatedGroup['groupActivity-SICcodes'].substr(coma2+1, i-coma2));
                            }
                            else{
                                $scope.updatedGroup1.push($scope.updatedGroup['groupActivity-SICcodes'].substr(coma2+1, i-coma2-1));
                                coma2 = i;
                            }
                        }
                    }
                    $scope.updatedGroup['groupActivity-SICcodes'] = [];
                    $scope.updatedGroup['groupActivity-SICcodes'] = $scope.updatedGroup1;
                }
                
                if ($scope.oldGroup['generatedTechnology-SICcodes'] != $scope.updatedGroup['generatedTechnology-SICcodes']
                    && length3 > 0){
                    $scope.updatedGroup1 = [];
                    var coma1 = [];
                    var coma2 = 0;
                    
                    for (var i1 = 0; i1 < length3; i1++){
                        if ($scope.updatedGroup['generatedTechnology-SICcodes'][i1] == ",") { coma1.push(i1); }
                    }
                    
                    for (var i = 0; i < length3; i++) {
                        if ($scope.updatedGroup['generatedTechnology-SICcodes'][i] == "," || i == length3-1) {
                            if (i == coma1[0]){
                                $scope.updatedGroup1.push($scope.updatedGroup['generatedTechnology-SICcodes'].substr(0, i));
                                coma2 = i;
                            }
                            else if (i == length3-1){
                                $scope.updatedGroup1.push($scope.updatedGroup['generatedTechnology-SICcodes'].substr(coma2+1, i-coma2));
                            }
                            else{
                                $scope.updatedGroup1.push($scope.updatedGroup['generatedTechnology-SICcodes'].substr(coma2+1, i-coma2-1));
                                coma2 = i;
                            }
                        }
                    }
                    $scope.updatedGroup['generatedTechnology-SICcodes'] = [];
                    $scope.updatedGroup['generatedTechnology-SICcodes'] = $scope.updatedGroup1;
                }
                
                if ($scope.oldGroup.keywords != $scope.updatedGroup.keywords && length4 > 0){
                    $scope.updatedGroup1 = [];
                    var coma1 = [];
                    var coma2 = 0;
                    
                    for (var i1 = 0; i1 < length4; i1++){
                        if ($scope.updatedGroup.keywords[i1] == ",") { coma1.push(i1); }
                    }
                    
                    for (var i = 0; i < length4; i++) {
                        if ($scope.updatedGroup.keywords[i] == "," || i == length4-1) {
                            if (i == coma1[0]){
                                $scope.updatedGroup1.push($scope.updatedGroup.keywords.substr(0, i));
                                coma2 = i;
                            }
                            else if (i == length4-1){
                                $scope.updatedGroup1.push($scope.updatedGroup.keywords.substr(coma2+1, i-coma2));
                            }
                            else{
                                $scope.updatedGroup1.push($scope.updatedGroup.keywords.substr(coma2+1, i-coma2-1));
                                coma2 = i;
                            }
                        }
                    }
                    $scope.updatedGroup.keywords = [];
                    $scope.updatedGroup.keywords = $scope.updatedGroup1;
                }
                
                    $http
                        .put("/api/v1/groups/" + $scope.groupId, $scope.updatedGroup)
                        .then(function (response) {
                            if(response.status == 200){
                              swal("Done!", "Group edited!", "success");
                            }
                            console.log("Updated");
                            $location.path("/");
                        },function(data) {
                            if(data.status == 500){
                                swal("Error!", "Error editing data in the database!", "error");
                            }
                            if(data.status == 400){
                              swal("Error!", "The format of the data inserted is incorrect!", "error");
                            }
                        }
                    );
            }
            refresh();
        }
    ]);