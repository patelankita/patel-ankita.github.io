(function(){
    angular
        .module("Bits&Bytes")
        .controller("LoginController",LoginController)

    function LoginController($location , UserService) {
        var vm= this;

        vm.login = function(username,password) {

            if(username && password)
            {
                UserService
                    .login(username, password)
                    .then(function (res) {

                            var user = res.data;
                            // console.log(user);
                            if (user)
                                $location.url("/user/" + user._id);
                            else
                                vm.error = "User not found";
                        },
                        function (err) {
                            vm.error = "User not found";
                        });
            }
            else
            {
                vm.error = "Please fill-in all the fields..";
            }
        }
    }
})();