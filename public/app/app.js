var app = angular.module('VisualCVApp', ['ngMaterial', 'ngRoute']);

app.controller('AppCtrl', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav) {
    // $scope.toggleSidenav = function(menuId) {
    //     $mdSidenav(menuId).toggle();
    // };

    $http.get('cv.json')
        .success(function(data) {
            $scope.cv = data;
            // var yearsJob = _.pluck(_.pluck($scope.cv.jobs, 'start_date'), 'year');
            // var yearsEdu = _.pluck(_.pluck($scope.cv.education, 'start_date'), 'year');
            // $scope.minYear = _.min(_.union(yearsJob, yearsEdu));
            // $scope.maxYear = _.max(_.union(yearsJob, yearsEdu));
            var startJob = _.pluck($scope.cv.jobs, 'start_date');
            var startEdu = _.pluck($scope.cv.paths, 'start_date');
            var endJob = _.pluck($scope.cv.jobs, 'end_date');
            var endEdu = _.pluck($scope.cv.paths, 'end_date');
            var startTotal = _.union(startJob, startEdu);
            var endTotal = _.union(endJob, endEdu);

            $scope.minDate = {
                year: _.min(_.pluck(startTotal, 'year')),
            };
            $scope.minDate.month = _.find(startTotal, {
                year: $scope.minDate.year
            }).month;

            $scope.maxDate = {
                year: _.max(_.pluck(endTotal, 'year')),
            };
            $scope.maxDate.month = _.find(endTotal, {
                year: $scope.maxDate.year
            }).month;

            console.log($scope.maxDate, $scope.minDate);

            $scope.dateRange = [];
            for (var m = parseInt($scope.minDate.month), y = parseInt($scope.minDate.year); y < parseInt($scope.maxDate.year) || m <= parseInt($scope.maxDate.month); m++) {
                if (m == 13) {
                    console.log('change');
                    m = 1;
                    y++;
                }
                console.log(m, y);
                $scope.dateRange.push({
                    year: y,
                    month: m
                });
            }
            console.log($scope.dateRange);
        });
}]);
