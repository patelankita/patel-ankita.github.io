/**
 * Created by Ankita on 12/7/16.
 */

(function(){
    angular
        .module("Bits&Bytes")
        .controller("RegisterController",RegisterController);

    function RegisterController($location , $routeParams , UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username, password, vpassword) {
            if(username && password && vpassword)
            {
                if(password === vpassword)
                {
                    var newUser = {
                        username: username,
                        password: password
                    };
                    UserService
                        .register(newUser)
                        .then(function(response){
                                var user = response.data;
                                if(user)
                                    $location.url("/user/"+user._id);
                                else
                                    vm.error = "Opps!! Cant register , please try again later!";
                            },
                            function(err){
                                vm.error = err.data;
                            });
                }
                else
                    vm.error = "Password doesn't match!!!"
            }
            else {
                vm.error = "Please fill all fields!!";
            }
        }
    }
})();
