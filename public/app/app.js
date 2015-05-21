var app = angular.module('VisualCVApp', ['ngMaterial', 'ngRoute']);

//for job or edu. return number of months
function getDuration(item) {
    return (item.end_date.year - item.start_date.year) * 12 + (item.end_date.month - item.start_date.month);
}

app.controller('AppCtrl', ['$rootScope', '$scope', '$http', '$mdSidenav', 
	function($rootScope, $scope, $http, $mdSidenav) {
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
            var startEdu = _.pluck($scope.cv.education, 'start_date');
            var endJob = _.pluck($scope.cv.jobs, 'end_date');
            var endEdu = _.pluck($scope.cv.education, 'end_date');
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

            console.log($scope.minDate, $scope.maxDate);

            $scope.dateRange = [];
            for (var m = parseInt($scope.minDate.month), y = parseInt($scope.minDate.year); y < parseInt($scope.maxDate.year) || m <= parseInt($scope.maxDate.month); m++) {
                if (m == 13) {
                    m = 1;
                    y++;
                }
                $scope.dateRange.push({
                    year: y,
                    month: m
                });
            }
            console.log($scope.dateRange.length, $scope.dateRange);

        });

    $rootScope.$watch(function() {
        //span each job/edu accordingly to duration
        var monthWidth = $("#timeline").width() / ($scope.dateRange.length);
        _.each($scope.cv.jobs, function(item) {
            item.duration = getDuration(item);
            item.width = parseInt(monthWidth * item.duration) + "px";
            console.log("compute");
        });
        console.log($scope.cv);
    });
}]);
