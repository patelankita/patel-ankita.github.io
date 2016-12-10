(function(){
    angular
        .module("Bits&Bytes")
        .controller("ProfileController",ProfileController);

    function ProfileController($location , $routeParams , UserService , $rootScope , $window) {
        console.log("here-1");
        var vm = this;
        vm.uid = $routeParams.uid;

        var id = $rootScope.currentUser._id;

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.homeRedirect=homeRedirect;

        function init() {

            $window.sessionStorage.removeItem("quesSearch");
            $window.sessionStorage.removeItem("userSearch");
            $window.sessionStorage.removeItem("quesSearchByUser");
            $window.sessionStorage.removeItem("quesSearchByUser_Username");

            UserService
                .findUserByID(id)
                .then(function (user) {
                    vm.user = user.data;
                    // console.log(vm.user);
                    // console.log("here");
                    if(vm.user && vm.user.is_admin){
                        vm.message = "Admin's Profile Page";
                    }
                });
        }

        init();

        function homeRedirect(){
            if(vm.user.is_admin)
                $location.url("/user/"+vm.user._id+"/admin/question");
            else
                $location.url("/user/"+vm.user._id+"/question");
        }

        function logout(){
            UserService
                .logout()
                .then(
                    function(res){
                        $window.sessionStorage.clear();
                        $location.url("/login");
                    },
                    function(err){
                        $location.url("/login");
                    }
                )
        }

        function updateUser(newUser) {

            // console.log("In update");
            UserService.updateUser(id, newUser)
                .then(function (res) {
                    // console.log(res);
                        vm.success = "Profile Updated Successfully !!";
                    },
                    function (error) {
                        vm.error = "Oops !! Not able to update the profile.. Please try again!";
                    });
        }

        function deleteUser(){
            UserService
                .deleteUser(id)
                .then(
                    function(res){
                        $location.url("/login");
                        // console.log("deleted");
                    },
                    function(){
                        vm.error = "Opps !! Cant delete.. Please try again!"
                        // console.log(vm.error);
                    }
                );
        }

    }})();
