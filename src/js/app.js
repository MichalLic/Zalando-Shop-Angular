const zalandoApp = angular.module('zalandoApp', ['ngRoute', 'LocalStorageModule', 'zalandoServices']);

zalandoApp.config(['$routeProvider', '$locationProvider', 'localStorageServiceProvider', ($routeProvider, $locationProvider, localStorageServiceProvider) => {

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

    localStorageServiceProvider
    // .setPrefix('zalandoApp')
        .setStorageType('localStorage')
        .setNotify(true, true)
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

zalandoApp.controller('productDetails', ['$scope', 'products', '$routeParams', 'localStorageService', ($scope, products, $routeParams, localStorageService) => {

    $scope.productDetails = [];
    $scope.optionsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    $scope.storageProducts = (key, value) => {

        $scope.product = {
            id: value.id,
            name: value.name,
            img: value.media.images[0].thumbnailHdUrl,
            color: value.color,
            price: value.units[0].price.value,
            currency: '£',
            quantity: 1
        };

        $scope.myArray = '';
        // $scope.productQuantity = angular.element('option').val();
        // console.log(`ilsoc produktu ` + $scope.productQuantity);

        if (localStorageService.get('myProducts') === null) {
            console.log('jest puste');
            $scope.myArray = [];
            $scope.myArray.push($scope.product);
            localStorageService.set('myProducts', JSON.stringify($scope.myArray));

        } else {
            $scope.myArray = JSON.parse(localStorageService.get('myProducts'));
            console.log($scope.myArray);
            angular.forEach($scope.myArray, (value, key) => {
                $scope.check = false;
                if (value.id === $scope.product.id) {
                    console.log('jest juz w koszyku taki gucio');
                    $scope.check = true;
                    // value.quantity += 1;
                    // console.log(value);
                }
            });
            if ($scope.check === false) {
                console.log('dodam product do niepustego koszyka');
                // console.log(JSON.parse(localStorageService.get(key)));
                $scope.myArray = JSON.parse(localStorageService.get('myProducts')) || [];
                $scope.myArray.push($scope.product);
                localStorageService.set('myProducts', JSON.stringify($scope.myArray));
            }
        }
    };

    products.getProductDetail
    ($routeParams.productId,
        (function (data) {
            $scope.productDetails = data;
            console.log(data);
        }));
}]);

zalandoApp.controller('storage', ['$scope', 'localStorageService', ($scope, localStorageService) => {

    $scope.myStorageProducts = JSON.parse(localStorageService.get('myProducts'));
    console.log($scope.myStorageProducts)

}]);

zalandoApp.controller('finalization', ['$scope', '$timeout', '$window', ($scope, $timeout, $window) => {

    $scope.present = false;

    $scope.submit = (form) => {
        $scope.present = true;
        console.log($scope.present);
        $timeout(() => {
            console.log('Redirecting to /products');
            // $window.location.href = '/products'
            angular.element('.well').remove();
        }, 4000)
    };
}]);