var app = angular.module('videoPortalApp', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngDialog', 'angular-md5']);

app.config(function ($stateProvider, $urlRouterProvider) {
   
    $urlRouterProvider.otherwise('/');
    
    $stateProvider.state("login", {
        url: "/",
        onEnter: ['$rootScope', 'ngDialog', function ($rootScope, ngDialog) {
                debugger;
                $rootScope.dialog = ngDialog.open({
                    templateUrl: 'app/views/login.html',
                    className: 'ngdialog-theme-default'
                })
            }],
        controller: "loginCtrl"
        
    })
    $stateProvider.state("dashboard", {
        url: "/dashboard/:sessionId/:skip/:limit",
        controller: "dashboardCtrl",
        templateUrl: "app/views/dashboard.html"
    })
    $stateProvider.state("logout", {
        url: "/logout",
        controller: "logoutCtrl"
    })
    $stateProvider.state("videodetails", {
        url: "/videodetails/:sessionId/:videoId/:limit",
        controller: "videoDetailsCtrl",
        templateUrl: "app/views/videoDetails.html",
        views: {
            '': {
                templateUrl: 'app/views/videoDetails.html',controller:videoDetailsCtrl
            },
            'videos@videodetails': { templateUrl: 'app/views/videos.html',controller:videoDetailsCtrl}
        }
    })
  
});