angular.module("GroupApp", ["ngRoute"]) // [] to initialize angular and import modules
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "list.html",
                controller : "ListCtrl"
            }).when("/group/:idGroup", {
                templateUrl : "edit.html",
                controller : "EditCtrl"
            }).when("/create", {
                templateUrl : "create.html",
                controller : "CreateCtrl"
            }).when("/search", {
                templateUrl : "search.html",
                controller : "SearchCtrl"
            }).when("/graph", {
                templateUrl : "graph.html",
                controller : "GraphCtrl"
            }).when("/grants", {
                templateUrl : "grants.html",
                controller : "GrantCtrl"
            }
        );
        
        console.log("App initialized");
    });