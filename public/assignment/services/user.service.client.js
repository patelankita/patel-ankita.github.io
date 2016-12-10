(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        
        var api = {

            createUser : createUser,
            findUserById : findUserById,
            findUserByCredentials : findUserByCredentials,
            findUserByUsername : findUserByUsername,
            updateUser : updateUser,
            deleteUser : deleteUser,
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            register: register
        };
        return api;

        function loggedIn(){
            return $http.get("/api/loggedin");
        }

        function logout(){
            return $http.post("/api/logout");
        }

        function login(username,password){
            // console.log("mafx");
            var user = {
                username: username,
                password: password
            };
            // console.log("in client:");
            // console.log(user);
            return $http.post("/api/login",user);
        }

        function register(newUser) {
            // var brandNewUser = {
            //     username: newUser.username,
            //     password: newUser.password
            // };
            // var url = "/api/register";
            // return $http.post(url, brandNewUser);
            debugger;
            return $http.post("/api/register",newUser);
        }

        function createUser(newUser){
            return $http.post("/api/user", newUser);

        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            // console.log(username);
            // console.log(password);
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function updateUser(newUser) {
            var url = "/api/user/" + newUser._id;
            return $http.put(url, newUser);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }
    }
})();



