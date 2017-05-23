const app = angular.module('zalandoServices', []);

app.factory('products', ['$http', ($http) => {

    const getProduct = (success, error) => {

        success = success || function () {};
        error = error || function () {};


        $http.get('https://shop-public-api.perimeter.zalan.do/articles')
            .then((data) => {
                success(data);
            }, () => {
                console.log('getting data error');
                error();
            });
    };

    return {
        getProduct: getProduct
    };

}]);