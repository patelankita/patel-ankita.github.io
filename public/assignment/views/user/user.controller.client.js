(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if (user === null) {
                vm.error = "No such user";
            }
            else
                $location.url("/user/" + user._id);
        }
    }

    function ProfileController(UserService, $routeParams) {

        var vm = this;
        vm.updateUser = updateUser;

        var userId = $routeParams.uid;
        var user = UserService.findUserById(userId);

        if (user != null) {
            vm.user = user;
        }

        function updateUser(newUser) {
            var nUser = UserService.updateUser(userId, newUser);
            if (nUser) {
                vm.success = "User Updated Successfully!!"
            }
            else {
                vm.error = "Oops! User already exists!!"
            }

        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(newUser) {
            if (newUser.password === newUser.vPassword){
                var newlyCreatedUser = UserService.createUser(newUser);
                if (newlyCreatedUser) {
                    $location.url("/user/" + newlyCreatedUser._id);
                }
                else {
                    vm.error = "OOPS!! Username already exists."
                }
            }
            else{
                vm.error= "Passwords do not match!!"
            }
        }
    }


})();




