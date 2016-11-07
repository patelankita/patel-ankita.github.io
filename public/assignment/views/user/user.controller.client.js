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
            var promise = UserService.findUserByCredentials(username, password);
            promise
                .success(function (user) {
                    if (user === '0') {
                        vm.error = "No such user";
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (ERROR) {
                    vm.error = "ERROR!!";
                });
        }
        // var vm = this;
        // vm.login = login;
        //
        // function login(username, password) {
        //     var user = UserService.findUserByCredentials(username, password);
        //     if (user === null) {
        //         vm.error = "No such user";
        //     }
        //     else
        //         $location.url("/user/" + user._id);
        // }
    }

    function ProfileController(UserService, $routeParams) {

        var vm = this;
        vm.updateUser = updateUser;

        var userId = $routeParams.uid;
        console.log(userId);
        function init() {
            var promise = UserService.findUserById(userId);
            promise
                .success(function(user){
                    if(user != '0') {
                        vm.user = user;
                    }
                })
                .error(function(ERROR){
                    vm.error = "ERROR";
                });
        }
        init();

        function updateUser(newUser) {

            UserService.updateUser(newUser)
                .then(function (response) {
                    vm.success = "Successfully updated your profile! :)";
                },
                function (error) {
                    vm.error = "Not able to update your profile , try again!";
                });

            // var nUser = UserService.updateUser(newUser);
            // if (nUser) {
            //     vm.success = "User Updated Successfully!!"
            // }
            // else {
            //     vm.error = "Oops! User already exists!!"
            // }

        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(newUser) {
            if (newUser.password === newUser.vPassword) {
                var userExistPromise = UserService.findUserByUsername(newUser.username);
                console.log(userExistPromise);
                userExistPromise
                    .success(function (user){
                        vm.error = "OOPS!! User already exists.";
                    })
                    .error(function(err){
                        var promise = UserService.createUser(newUser);
                        promise
                            .success(function (user) {
                                $location.url("/user/" + user._id);
                            })
                            .error(function (ERROR) {
                                vm.error = "ERROR";
                            });
                    });
            }
            // if (newUser.password === newUser.vPassword){
            //     var newlyCreatedUser = UserService.createUser(newUser);
            //     if (newlyCreatedUser) {
            //         $location.url("/user/" + newlyCreatedUser._id);
            //     }
            //     else {
            //         vm.error = "OOPS!! Username already exists."
            //     }
            // }
             else{
                 vm.error= "Passwords do not match!!"
            }
        }
    }


})();




