angular.module("GroupApp")
    .controller("Graph2Ctrl", ["$scope", "$http", function($scope, $http) {
        $scope.newDate = {};
        $scope.newDate.dateSelected = [];
        $scope.newDate.monthSelected = [];
        
        /**************************  START FUNCTION  *************************/
        function refresh() {
            $http
                .get("/api/v1/chartsData")
                .then(function(response) {
                    $scope.data = response.data;
                    
                    var dates = [];
                    var months = [];
                    for (var i = 0; i < $scope.data.length; i++) {
                        if (i == 0) {
                            dates.push($scope.data[i].creationDate);
                            months.push($scope.data[i].creationDate.split("-")[1]);
                        }
                        else {
                            if ( !(dates.includes($scope.data[i].creationDate)) ){
                                dates.push($scope.data[i].creationDate);
                            }
                            
                            if ( !(months.includes($scope.data[i].creationDate.split("-")[1])) ){
                                months.push($scope.data[i].creationDate.split("-")[1]);
                            }
                        }
                    }
                    
                    document.getElementById("day").innerHTML= "";
	                document.getElementById("month").innerHTML= "";
	                
	                for (var l = 0; l < dates.length; l++) {
        			    document.getElementById("day").innerHTML += "<option>"+ dates[l] +"</option>";
        			}
        			for (var m = 0; m < months.length; m++) {
        			    document.getElementById("month").innerHTML += "<option>"+ months[m] +"</option>";
        			}
                },function(data) {
                    if(data.status == 404){
                        swal("Error!", "There aren´t data of charts in the database!", "error");
                    }
                }
            );
        }
        /*********************************************************************/
        
        /****************************  SELECT DAY  ***************************/
        $scope.selectDay = function () {
            refresh();
            var daySelected = document.getElementById("day").value;
            var url = "/api/v1/chartsData/" + daySelected;
            $http
                .get(url)
                .then(function(response) {
                    $scope.data = response.data;
                    
                    var keywords = [];
                    var numTweets = [];
                    for (var i = 0; i < $scope.data.length; i++) {
                        keywords.push($scope.data[i].keyword);
                        numTweets.push($scope.data[i].numTweets);
                        console.log("keyword: " + $scope.data[i].keyword);
                        console.log("numTweets: " + $scope.data[i].numTweets);
                    }
                    
                    /*-*-*-*-*-*-*-*-*-*- CHART1 -*-*-*-*-*-*-*-*-*-*/
                    var title = 'Tweets from date ' + daySelected;
                    
                    Highcharts.chart('container', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: title
                        },
                        subtitle: {
                            text: 'Source: si1718-rgg-groups'
                        },
                        xAxis: {
                            categories: keywords,
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Number of tweets'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.f} tweets </b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: daySelected,
                            data: numTweets
                        }]
                    });
                    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*/
                }
            );
        }
        /*********************************************************************/
        
        /***************************  SELECT MONTH  **************************/
        $scope.selectMonth = function () {
            var monthSelected = document.getElementById("month").value;
            var url = "/api/v1/chartsData1/" + monthSelected;
            $http
                .get(url)
                .then(function(response) {
                    $scope.data = response.data;
                    
                    var data = [];
                    var data1 = [];
                    for (var i = 0; i < $scope.data.length; i++) {
                        var elem = [];
                        elem.push($scope.data[i].keyword);
                        elem.push($scope.data[i].numTweets);
                        data.push(elem);
                    }
                    
                    var biol = 0; var biot = 0; var comunic = 0; var science = 0; var health = 0;
                    var humanities = 0; var technol = 0; var energy = 0; var tic = 0; var elem1 = [];
                    
                    for (var j = 0; j < data.length; j++) {
                        if ((data[j][0]).includes("biology")) {
                            biol += parseInt(data[j][1]);
                        }
                        else if ((data[j][0]).includes("biotech")) {
                            biot += parseInt(data[j][1]);
                        }
                        else if ((data[j][0]).includes("comunicacion")) {
                            comunic += parseInt(data[j][1]);
                        }
                        else if ((data[j][0]).includes("science")) {
                            science += parseInt(data[j][1]);
                        }
                        else if ((data[j][0]).includes("health")) {
                            health += parseInt(data[j][1]);
                        }
                        else if ((data[j][0]).includes("humanities")) {
                            humanities += parseInt(data[j][1]);
                        }
                        else if ((data[j][0]).includes("technology")) {
                            technol += parseInt(data[j][1]);
                        }
                        else if ((data[j][0]).includes("energy")) {
                            energy += parseInt(data[j][1]);
                        }
                        else if ((data[j][0]).includes("tic")) {
                            tic += parseInt(data[j][1]);
                        }
                    }
                    elem1.push("biology"); elem1.push(biol); elem1.push("false"); data1.push(elem1); elem1 = [];
                    elem1.push("biotech"); elem1.push(biot); elem1.push("false"); data1.push(elem1); elem1 = [];
                    elem1.push("comunicacion"); elem1.push(comunic); elem1.push("false"); data1.push(elem1); elem1 = [];
                    elem1.push("science"); elem1.push(science); elem1.push("false"); data1.push(elem1); elem1 = [];
                    elem1.push("health"); elem1.push(health); elem1.push("false"); data1.push(elem1); elem1 = [];
                    elem1.push("humanities"); elem1.push(humanities); elem1.push("false"); data1.push(elem1); elem1 = [];
                    elem1.push("technology"); elem1.push(technol); elem1.push("false");/*elem1.push("true"); elem1.push("true");*/ data1.push(elem1); elem1 = [];
                    elem1.push("energy"); elem1.push(energy); elem1.push("false"); data1.push(elem1); elem1 = [];
                    elem1.push("tic"); elem1.push(tic); elem1.push("false"); data1.push(elem1); elem1 = [];
                    console.log(data1);
                    
                    /*-*-*-*-*-*-*-*-*-*- CHART2 -*-*-*-*-*-*-*-*-*-*/
                    var tit = "Number of tweets for the month of " +  monthSelected;
                    
                    Highcharts.chart('container', {

                        title: {
                            text: tit
                        },
                    
                        xAxis: {
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        },
                    
                        series: [{
                            type: 'pie',
                            allowPointSelect: true,
                            keys: ['name', 'y', 'selected', 'sliced'],
                            data: data1,
                            showInLegend: true
                        }]
                    });
                    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*/
                }
            );
        }
        /*********************************************************************/
        
        refresh();
    }]);