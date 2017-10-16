(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, UserService) {

        var vm = this;
        vm.login = login;
        vm.error=null;

        function login(username, password) {
            // console.log("in controller login"+username);
            if (username && password){
                // console.log(password);
                UserService
                    .login(username, password)
                    .then(function (response) {

                            var user = response.data;
                            // console.log("near redirect"+user);
                            // console.log(user);
                            if (user)
                                //$location.url("/user/" + user._id);
                                $location.url("/user");
                            else
                                vm.error = "User not found";
                        },
                        function (err) {
                            vm.error = "User not found";
                        });
            }
            else{
                vm.error="Oops !! Please enter username and password!!";
            }

        }

    }

    function ProfileController($location ,UserService, $routeParams, $rootScope) {

        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout =logout;

        var id = $rootScope.currentUser._id;
        //console.log(userId);
        function init() {
            var promise = UserService.findUserById(id);
            promise
                .success(function(user){
                    //console.log(user);
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
                    vm.error = "Oops!! Not able to update your profile , try again!";
                });


        }

        function deleteUser(){
            UserService
                .deleteUser(userId)
                .then(
                    function(response){
                        $location.url("/login");
                        console.log("deleted");
                    },
                    function(){
                        vm.error = "Cannot delete"
                        console.log(vm.error);
                    }
                );
        }


        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function(){
                        $location.url("/login");
                    }
                )
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username,password,vpassword) {
            if(username && password && vpassword)
            {
                if(password === vpassword)
                {
                    var newUser = {
                        // _id: (new Date()).getTime()+"",
                        username: username,
                        password: password
                    };
                    UserService
                        .register(newUser)
                        // .createUser(newUser)
                        .then(function(response){
                                var user = response.data;
                                if(response.data)
                                    $location.url("/user/"+user._id);
                                else
                                    vm.error = "Unable to register, please try again later!";
                            },
                            function(err){
                                vm.error = err.data;
                            });
                }
                else
                {
                    vm.error = "Password doesn't match!!!"
                    vm.perror= "Please make sure password and verify password are both same"
                }
            }
            else {
                vm.error = "You did not fill all the required fields!!";
            }
        }
    }


})();




