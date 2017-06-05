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
            controller: 'finalization'
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

        $scope.productQuantity = Number(angular.element('select').val());
        $scope.product = {
            id: value.id,
            name: value.name,
            img: value.media.images[0].thumbnailHdUrl,
            color: value.color,
            quantity: $scope.productQuantity,
            price: value.units[0].price.value,
            currency: '£',
        };

        if (localStorageService.get('myProducts') === null) {
            console.log('LocalStorage is empty');
            $scope.LocalStorageProducts = [];
            $scope.LocalStorageProducts.push($scope.product);
            localStorageService.set('myProducts', JSON.stringify($scope.LocalStorageProducts));

        } else {
            $scope.LocalStorageProducts = JSON.parse(localStorageService.get('myProducts'));
            $scope.check = false;
            angular.forEach($scope.LocalStorageProducts, (value, key) => {
                if (value.id === $scope.product.id) {
                    console.log('Was here product at the same id');
                    value.quantity += $scope.productQuantity;
                    $scope.check = true;
                    localStorageService.set('myProducts', JSON.stringify($scope.LocalStorageProducts));
                }
            });
            if ($scope.check === false) {
                console.log('Added product to not empty LocalStorage');
                $scope.LocalStorageProducts = JSON.parse(localStorageService.get('myProducts')) || [];
                $scope.LocalStorageProducts.push($scope.product);
                localStorageService.set('myProducts', JSON.stringify($scope.LocalStorageProducts));
            }
        }
    };

    products.getProductDetail
    ($routeParams.productId,
        (function (data) {
            $scope.productDetails = data;
            // console.log(data);
        }));
}]);

zalandoApp.controller('finalization', ['$scope', '$timeout', '$window', 'localStorageService', ($scope, $timeout, $window, localStorageService) => {

    $scope.myStorageProducts = JSON.parse(localStorageService.get('myProducts'));
    console.log($scope.myStorageProducts);

    $scope.present = false;
    $scope.emptyCart = false;
    $scope.totalProducts = {
        price: 0,
        quantity: 0
    };

    if ($scope.myStorageProducts === null) {
        $scope.emptyCart = true;
    }

    $scope.submit = (form) => {
        $scope.present = true;
        console.log($scope.present);
        $timeout(() => {
            console.log('Redirecting to /products');
            localStorageService.clearAll();
            // $window.location.href = '/products'
            angular.element('.well').remove();
        }, 4000)
    };

    angular.forEach($scope.myStorageProducts, (value) => {
        $scope.totalProducts.price += (value.price * value.quantity);
        $scope.totalProducts.quantity += value.quantity;
    });

    $scope.clearLocalStorageItem = (key) => {
        $scope.myStorageProducts.splice(key, 1);
        localStorageService.set('myProducts', JSON.stringify($scope.myStorageProducts));
        console.log($scope.myStorageProducts)
    };

    $scope.clearLocalStorage = () => {
        localStorageService.clearAll();
    }
}]);