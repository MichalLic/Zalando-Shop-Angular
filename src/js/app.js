const zalandoApp = angular.module('zalandoApp', ['ngRoute', 'zalandoServices']);

zalandoApp.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

    $routeProvider
        .when('/products', {
            templateUrl: 'html/products.html',
            controller: 'zalandoController'
        })
        .when('/details/:productId', {
            templateUrl: 'html/details.html',
            controller: 'productDetails'
        })
        .otherwise({
            redirectTo: '/products'
        });

    $locationProvider.html5Mode(true);
}]);


zalandoApp.controller('zalandoController', ['$scope', 'products',($scope, products) => {

    $scope.produts = [];
    $scope.filterBy = {};

    products.getProduct(function (data) {
        console.log(data);
        $scope.products = data;
    });

}]);

zalandoApp.controller('productDetails', ['$scope', 'products', '$routeParams', ($scope, products, $routeParams) => {

    $scope.productDetails = [];

    products.getProductDetail
    ($routeParams.productId,
        (function (data) {
            $scope.productDetails = data;
            console.log(data);
        }))
}]);