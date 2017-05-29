const zalandoApp = angular.module('zalandoApp', ['ngRoute', 'ngStorage', 'zalandoServices']);

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
        .when('/cart', {
            templateUrl: 'html/cart.html',
            controller: 'storage'
        })
        .otherwise({
            redirectTo: '/products'
        });

    $locationProvider.html5Mode(true);
}]);


zalandoApp.controller('zalandoController', ['$scope', 'products', '$timeout', ($scope, products, $timeout) => {

    $scope.produts = [];
    $scope.filterBy = {};
    $scope.showMess = false;

    products.getProduct(function (data) {
        $scope.products = data;
    });

    $scope.showCartMessage = function () {
        $scope.showMess = true;
        $timeout(() => {
            console.log('ajajajaja');
            $scope.showMess = false;
        }, 3000);
    };



}]);

zalandoApp.controller('productDetails', ['$scope', 'products', '$routeParams', '$localStorage', ($scope, products, $routeParams, $localStorage) => {

    $scope.productDetails = [];
    $scope.$storage = $localStorage;

    products.getProductDetail
    ($routeParams.productId,
        (function (data) {
            $scope.productDetails = data;
            // console.log(data);
            // console.log($scope.productDetails);
        }));

}]);

zalandoApp.controller('storage', ['$scope', '$localStorage', ($scope, $localStorage)=>{
    $scope.$storage = $localStorage;
    console.log($scope.$storage.productCart);

}]);