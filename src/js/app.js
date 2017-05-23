const zalandoApp = angular.module('zalandoApp', ['zalandoServices']);

zalandoApp.controller('zalandoController', ['$scope', 'products', ($scope, products) => {

    $scope.produts = [];

    products.getProduct(function (data) {
        $scope.products = data;
    });

}]);