/**
 * Created by Ankita on 12/7/16.
 */

(function(){
    angular
        .module("Bits&Bytes")
        .controller("UserSearchController",UserSearchController);

    function UserSearchController($location,$routeParams,UserService,$rootScope,$window) {

        var vm = this;
        var userId = $window.sessionStorage.getItem("currentUser");
        vm.searchUsers = searchUsers;
        vm.uid = userId;
        // console.log(vm.uid);
        vm.goBack=goBack;

        function init(){
            if($window.sessionStorage.getItem("userSearchByUser")){
                vm.users=[];
                searchFollowing($window.sessionStorage.getItem("userSearchByUser"));
            }
            else if($window.sessionStorage.getItem("userSearch")){
                vm.searchText=$window.sessionStorage.getItem("userSearch");
                searchUsers(vm.searchText);
            }
        }

        init();

        function searchFollowing(uid){
            UserService
                .findUserByID(uid)
                .then(
                    function(user){
                        vm.following = user.data.following;
                        searchUsersByIds(vm.following.length);
                    },function(err){
                        vm.error = "Error retreiving users now , please try again later";
                    }
                )
        }

        function searchUsersByIds(n){
            if(n > 0){
                UserService
                    .findUserByID(vm.following[n-1])
                    .then(
                        function(user){
                            vm.users.push(user.data);
                            searchUsersByIds(n-1);
                        },function(err){
                            vm.error = "Error retreiving user now , please try again later";
                            searchUsersByIds(n-1);
                        }
                    );
            }
        }

        function goBack(){
            $window.sessionStorage.removeItem("quesSearchByUser");
            $window.sessionStorage.removeItem("quesSearchByUser_Username");
            $window.sessionStorage.removeItem("userSearchByUser");
            $window.history.back();
        }

        function searchUsers(searchText) {
            vm.error=null;
            UserService
                .searchUsersByUsername(searchText)
                .then(
                    function(response){
                        var usersRet = response.data;
                        $window.sessionStorage.setItem("userSearch",searchText);
                        for (var i in usersRet) {
                            if (usersRet[i]._id === userId) {
                                usersRet.splice(i,1);
                            }
                        }
                        vm.users = usersRet;
                    },
                    function(error){
                        vm.error = "Unable to access users data";
                    });
        }

    }
})();