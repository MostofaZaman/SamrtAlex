'use strict';
app.controller('IndexCtrl', function ($scope, $mdSidenav, $state, ngDialog, NewMatchService) {
    var dialog;
    $scope.menuItems = [
      { name: 'autocomplete', path: 'autocomplete' },
      { name: 'bottom sheet', path: 'bottomSheet' },
      { name: 'button', path: 'button' },
      { name: 'card', path: 'card' },
      { name: 'date picker', path: 'datePicker' },
      { name: 'grid list', path: 'gridList' },
      { name: 'input', path: 'input' },
      { name: 'progress circular', path: 'progressCircular' },
      { name: 'progress linear', path: 'progressLinear' },
      { name: 'toast', path: 'toast' },
      { name: 'whiteframe', path: 'whiteframe' },
    ];
    $scope.clickToOpen = function () {
        dialog = ngDialog.open({ templateUrl: 'app/views/new_match.html', className: 'ngdialog-theme-default', scope: $scope });
    };
    
    $scope.play = function (path, title, team) {
        debugger;
        if (team == undefined) {
           return alert('Please input team one')
        }
        if (team == undefined) {
            return alert('Please input team two')
        }
        var createTeam = {
            Team1: team.teamOne,
            Team2: team.teamTwo
        }
        NewMatchService.Save(createTeam).then(function (data) {
                dialog.close();
                debugger;
                $state.go(path, { 'matchId':parseInt(data.Id) });
                $scope.title = title;
            }, function (error) {
                console.log(error);
            });
      
    }
    $scope.title = 'Cric Card';

    $scope.go = function (path, title) {
        $state.go(path);
        $scope.title = title;
    }

    $scope.toggleLeft = function () {
        $mdSidenav('left')
              .toggle();
    }

    $scope.menuIcon = 'menu';
    $scope.menuToggle = function () {
        if ($scope.menuIcon == 'menu') {
            $mdSidenav('left')
              .open();
            $scope.menuIcon = 'arrow_back';
        }
        else {
            $mdSidenav('left')
              .close();
            $scope.menuIcon = 'menu';
        }
    }
});