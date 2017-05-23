const app = angular.module('zalandoServices', []);

app.factory('products', ['$http', ($http) => {

    const getProduct = (success, error) => {

        success = success || function () {};
        error = error || function () {};


        $http.get('https://api.zalando.com/articles/')
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