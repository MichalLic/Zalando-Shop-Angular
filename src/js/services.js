const app = angular.module('zalandoServices', []);

app.factory('products', ['$http', '$timeout', ($http, $timeout) => {

    const getProduct = (success, error) => {

        success = success || function () {
            };
        error = error || function () {
            };


        $http.get('https://shop-public-api.perimeter.zalan.do/articles/', {
            headers: {'Accept-Language': 'en'}
        })
            .then((data) => {
                success(data);
            }, () => {
                console.log('getting data error');
                error();
            });
    };

    const getProductDetail = (productId, success, error) => {

        success = success || function () {
            };
        error = error || function () {
            };

        $http.get('https://shop-public-api.perimeter.zalan.do/articles/' + productId, {
            headers: {'Accept-Language': 'en'}
        })
            .then((data) => {
                success(data);
            }, () => {
                console.log('getting data error');
                error();
            });
    };

    return {
        getProduct: getProduct,
        getProductDetail: getProductDetail,
    };


}]);