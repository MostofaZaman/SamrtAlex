app.controller('loginCtrl', loginCtrl);
function loginCtrl($timeout, $q, $log, $scope, $rootScope, $state, $stateParams, ngDialog, md5, LoginService) {
    debugger;
    var dialog = $rootScope.dialog;
    
    $scope.clickToOpen = function () {
        $rootScope.dialog = ngDialog.open({ templateUrl: 'app/views/login.html', className: 'ngdialog-theme-default', scope: $scope });
    };
    if ($stateParams.sessionId == 'undefined' || $stateParams.sessionId == null) {
        $rootScope.loginVisible = true;
        $rootScope.logoutVisible = false;
        $rootScope.showAllVideosVisible = false;
    }
    else {
        $rootScope.loginVisible = false;
        $rootScope.logoutVisible = true;
        $rootScope.showAllVideosVisible = false;
    }
    
    $scope.login = function (user) {
        debugger;
        var encryptedPassword = md5.createHash(user.password || '');
        LoginService.userLogin(user.name, encryptedPassword).then(function (result) {
            $rootScope.sessionId = result.sessionId;
            $rootScope.userName = result.username;
            $rootScope.loginVisible = false;
            $rootScope.logoutVisible = true;
            $state.go('dashboard', { 'sessionId': result.sessionId, 'skip': parseInt(0), 'limit': parseInt(10) });
            dialog.close();
        }, function (error) {
            console.log(error);
        });
    };
    var ids = ['3d_rotation', 'account_balance'];
    var currentId = 0
    var svgMorpheus = new SVGMorpheus('#iconn');
    setInterval(function () {
        var thisId = currentId === 1 ? 0 : 1
        currentId = thisId;
        svgMorpheus.to(ids[currentId], { duration: 500 });
    }, 1500);
}