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
        .when('/finalization', {
            templateUrl: 'html/finalization.html',
            controller: 'finalization'
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
            $scope.showMess = false;
        }, 3000);
    };
}]);

zalandoApp.controller('productDetails', ['$scope', 'products', '$routeParams', '$localStorage', ($scope, products, $routeParams, $localStorage) => {

    $scope.productDetails = [];
    $scope.$storage = $localStorage;
    $scope.optionsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    products.getProductDetail
    ($routeParams.productId,
        (function (data) {
            $scope.productDetails = data;
            console.log(data);
        }));
}]);

zalandoApp.controller('storage', ['$scope', '$localStorage', ($scope, $localStorage) => {
    $scope.$storage = $localStorage;
}]);

zalandoApp.controller('finalization', ['$scope', '$timeout', '$localStorage', '$window', ($scope, $timeout, $localStorage, $window) => {

    $scope.present = false;

    $scope.submit = (form) => {
        $scope.present = true;
        console.log($scope.present);
        $timeout(() => {
            console.log('Redirecting to /products');
            // $window.location.href = '/products'
            angular.element('.well').remove();
            // $localStorage.reset();
        }, 4000)
    };
}]);