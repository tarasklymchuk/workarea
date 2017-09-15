var app = angular.module('app', ['ui.bootstrap.datetimepicker', 'angularUtils.directives.dirPagination']);
const $url = 'http://192.168.10.10:3000/';
// app.$inject='$http';
app.controller('TableController', ['$http', '$scope', function ($http, $scope) {
    /**
     * get all people
     */
    $scope.getAllPeople = function () {
        $http({
            method: 'GET',
            url: $url
        }).then(function (res) {
            $scope.users = res.data;
        });
    };
    $scope.getAllPeople();

    /**
     * entity user
     *
     * @type {{}}
     */
    $scope.entity = {};

    /**
     * update action
     *
     * @param $user
     */
    $scope.update = function () {

        console.log($scope.entity);
        $http({
            method: 'PUT',
            url: $url + 'staff/' + $user._id
        }).done(function (res) {
            $scope.getAllPeople();
            swal(
                'Deleted!',
                res.message,
                'success'
            );

        });
    };
    /**
     * save action
     */
    $scope.save = function () {
        $http({
            method: 'POST',
            url: $url,
            dataType: 'json',
            data: $scope.entity
        }).then(function (res) {
            $('#add').modal('close');
            $scope.getAllPeople();
        });
    };

    /**
     * delete specified user
     *
     * @param user
     */
    $scope.delete = function (user) {
        swal({
            title: 'Are you sure?',
            text: "You won't " + user.fio + " delete?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            $http({
                method: 'DELETE',
                url: $url + 'staff/' + user._id
            }).then(function (res) {
                $scope.getAllPeople();
                swal(
                    'Deleted!',
                    res.data.message,
                    'success'
                );
            });

        })
    };
    /**
     * view user
     * @param user
     */
    $scope.view = function (user) {
        $('#profile').removeClass('hidden');
        $scope.staff = user;
    };

    $scope.edit = function (user) {
        // $('#profile').removeClass('hidden');
        $scope.people = user;
    };
    /**
     * sorting
     * @param keyname
     */
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

}]);