const zalandoApp = angular.module('zalandoApp', ['ngRoute', 'zalandoServices']);

zalandoApp.config(['$routeProvider', '$locationProvider' , ($routeProvider, $locationProvider)=> {

    $routeProvider
        .when('/products', {
            templateUrl: 'html/products.html',
            controller: 'zalandoController'
        })
        .when('/product-detail/:productId', {
            templateUrl: 'html/product-details.html',
            controller: 'zalandoController'
        })
        .otherwise({
            redirectTo: '/products'
        });

    $locationProvider.
        html5Mode(true);
}]);


zalandoApp.controller('zalandoController', ['$scope', 'products', ($scope, products) => {

    $scope.produts = [];

    products.getProduct(function (data) {
        $scope.products = data;
    });

}]);