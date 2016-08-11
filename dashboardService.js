app.factory('DashboardService', function ($http, $q) {
    var baseurl = "/videos";
    function getAllVideos(sessionId, skip, limit) {
        var deferred = $q.defer();
        
        $http.get(baseurl + '?sessionId='+ sessionId + '&skip='+ skip + '&limit=' + limit).then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }

    return {
        getAllVideos: getAllVideos
    };
});