angular.module('routerRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home.html',
                controller: 'homeController',
                controllerAs: 'home'
            })
            .when('/contact', {
                templateUrl: 'app/views/pages/contact.html',
                controller: 'contactController',
                controllerAs: 'contact'
            });

        $locationProvider.html5Mode(true);
    });
