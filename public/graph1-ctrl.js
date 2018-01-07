angular.module("GroupApp")
    .controller("Graph1Ctrl", ["$scope", "$http", function($scope, $http) {
        function refresh() {
            $http
                .get("/api/v1/groups")
                .then(function(response) {
                    $scope.data = response.data;
                    
                    var BIOarea = 0; var AGRarea = 0; var FQMarea = 0; var CTSarea = 0; var SEJarea = 0;
                    var HUMarea = 0; var TEParea = 0; var RNMarea = 0; var TICarea = 0;
                    var componentsTotalNumber = 0;
                    
                    for (var i = 0; i < $scope.data.length; i++){
                        if ($scope.data[i].scientificTechnicalArea == "Biología y Biotecnología BIO") {
                            BIOarea += $scope.data[i].components.length;
                            componentsTotalNumber += $scope.data[i].components.length;
                        }
                        
                        else if ($scope.data[i].scientificTechnicalArea == "Agroindustrial y Alimentación AGR") {
                            AGRarea += $scope.data[i].components.length;
                            componentsTotalNumber += $scope.data[i].components.length;
                        }
                        
                        else if ($scope.data[i].scientificTechnicalArea == "Ciencias exactas y experimentales FQM") {
                            FQMarea += $scope.data[i].components.length;
                            componentsTotalNumber += $scope.data[i].components.length;
                        }
                        
                        else if ($scope.data[i].scientificTechnicalArea == "Salud CTS") {
                            CTSarea += $scope.data[i].components.length;
                            componentsTotalNumber += $scope.data[i].components.length;
                        }
                        
                        else if ($scope.data[i].scientificTechnicalArea == "Ciencias sociales, económicas y jurídicas SEJ") {
                            SEJarea += $scope.data[i].components.length;
                            componentsTotalNumber += $scope.data[i].components.length;
                        }
                        
                        else if ($scope.data[i].scientificTechnicalArea == "Humanidades y creación artística HUM") {
                            HUMarea += $scope.data[i].components.length;
                            componentsTotalNumber += $scope.data[i].components.length;
                        }
                        
                        else if ($scope.data[i].scientificTechnicalArea == "Tecnologías de la producción y la construcción TEP") {
                            TEParea += $scope.data[i].components.length;
                            componentsTotalNumber += $scope.data[i].components.length;
                        }
                        
                        else if ($scope.data[i].scientificTechnicalArea == "Recursos Naturales, Energía y Medio Ambiente RNM") {
                            RNMarea += $scope.data[i].components.length;
                            componentsTotalNumber += $scope.data[i].components.length;
                        }
                        
                        else if ($scope.data[i].scientificTechnicalArea == "Tecnologías de la Información y la Comunicación TIC") {
                            TICarea += $scope.data[i].components.length;
                            componentsTotalNumber += $scope.data[i].components.length;
                        }
                    }
                    // % of components among the research areas
                    BIOarea = (BIOarea * 100)/componentsTotalNumber;
                    AGRarea = (AGRarea * 100)/componentsTotalNumber;
                    FQMarea = (FQMarea * 100)/componentsTotalNumber;
                    CTSarea = (CTSarea * 100)/componentsTotalNumber;
                    SEJarea = (SEJarea * 100)/componentsTotalNumber;
                    HUMarea = (HUMarea * 100)/componentsTotalNumber;
                    TEParea = (TEParea * 100)/componentsTotalNumber;
                    RNMarea = (RNMarea * 100)/componentsTotalNumber;
                    TICarea = (TICarea * 100)/componentsTotalNumber;
                    
                    
                    
                    /********************* CHART1 *********************/
                    // Radialize the colors
                    Highcharts.setOptions({
                        colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
                            return {
                                radialGradient: {
                                    cx: 0.5,
                                    cy: 0.3,
                                    r: 0.7
                                },
                                stops: [
                                    [0, color],
                                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                                ]
                            };
                        })
                    });
                    
                    // Build the chart1
                    Highcharts.chart('container', {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        title: {
                            text: 'Distribution of components (researchers) in the research areas'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    style: {
                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    },
                                    connectorColor: 'silver'
                                }
                            }
                        },
                        series: [{
                            name: 'Brands',
                            data: [
                                { name: 'Biología y Biotecnología BIO', y: BIOarea },
                                { name: 'Agroindustrial y Alimentación AGR', y: AGRarea },
                                { name: 'Ciencias exactas y experimentales FQM', y: FQMarea },
                                { name: 'Salud CTS', y: CTSarea },
                                { name: 'Ciencias sociales, económicas y jurídicas SEJ', y: SEJarea},
                                {
                                    name: 'Humanidades y creación artística HUM',
                                    y: HUMarea,
                                    sliced: true,
                                    selected: true
                                },
                                { name: 'Tecnologías de la producción y la construcción TEP', y: TEParea },
                                { name: 'Recursos Naturales, Energía y Medio Ambiente RNM', y: RNMarea },
                                { name: 'Tecnologías de la Información y la Comunicación TIC', y: TICarea }
                            ]
                        }]
                    });
                    /*************************************************/
                }, function (data){
                    if(data.status == 404){
                        swal("Error!", "There aren´t groups in the database!", "error");
                    }
                });
        };
        
        refresh();
    }]);