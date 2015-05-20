//https://gist.github.com/cage1016/5730213
angular.module('CustomFilters', [])
    .filter('range', function() {
        return function(min, max) {
            min = parseInt(min); //Make string input int
            max = parseInt(max);
            for (var i = min; i < max; i++)
                input.push(i.toString().padLeft(2, "0"));
            return input;
        };
    });
