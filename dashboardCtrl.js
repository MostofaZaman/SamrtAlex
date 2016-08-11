app.controller('dashboardCtrl', dashboardCtrl);
function dashboardCtrl($timeout, $q, $log, $scope, $window, $rootScope, $state, $stateParams, DashboardService, RatingService) {
    var sessionId = $stateParams.sessionId;
    var skip = $stateParams.skip;
    var limit = $stateParams.limit;
    
    $scope.rateVideo = function (videoId, ratingPoint) {
        debugger;
        RatingService.rateVideo(sessionId, videoId, ratingPoint).then(function (data) { 
        }, function (error) {
            console.log(error);
        });
    }
    
    $scope.showDetails = function (videoId) {
        debugger;
        $state.go('videodetails', { 'sessionId': sessionId , 'videoId': videoId, 'limit': 10 });
    };
    
    function init() {
        if (sessionId != 'undefined' || sessionId != null) {
            DashboardService.getAllVideos(sessionId, skip, limit).then(function (videos) {
                $rootScope.loginVisible = false;
                $rootScope.logoutVisible = true;
                $rootScope.showAllVideosVisible = false;
                $scope.videos = [];
                for (var i = 0; i < videos.length; i++) {
                    var sum = videos[i].ratings.reduce(function (a, b) { return a + b; }, 0);
                    $scope.videos.push(
                        {
                            _id: videos[i]._id,
                            description: videos[i].description,
                            name: videos[i].name,
                            url: videos[i].url,
                            rate: Math.round(sum / videos[i].ratings.length)
                        }
                    );
                };
            }, function (error) {
                console.log(error);
            });
        }
    }
    
    angular.element($window).bind("scroll", function () {
        var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        var body = document.body, html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            if (sessionId != 'undefined' || sessionId != null) {
                DashboardService.getAllVideos(sessionId, skip, $stateParams.limit + 10).then(function (videos) {
                    debugger;
                    $rootScope.loginVisible = false;
                    $rootScope.logoutVisible = true;
                    $scope.videos = [];
                    for (var i = 0; i < videos.length; i++) {
                        var sum = videos[i].ratings.reduce(function (a, b) { return a + b; }, 0);
                        $scope.videos.push(
                            {
                                _id: videos[i]._id,
                                description: videos[i].description,
                                name: videos[i].name,
                                url: videos[i].url,
                                rate: Math.round(sum / videos[i].ratings.length)
                            }
                        );
                    };
                }, function (error) {
                    console.log(error);
                });
            }
        }
    });
    
    init();
}