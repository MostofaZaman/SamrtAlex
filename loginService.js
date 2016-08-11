app.factory('LoginService', function ($http, $q) {
    var baseurl = "/user/auth";
    function userLogin(userName, password) {
        var deferred = $q.defer();
        
        $http.post(baseurl, {"username": userName,"password": password}).then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    return {
        userLogin: userLogin
    };
});