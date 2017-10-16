(function (){
    angular
        .module("Bits&Bytes")
        .factory("UserService",UserService);

    function UserService($http) {
        var api = {
            login: login,
            loggedIn:loggedIn,
            logout: logout,
            createUser: createUser,
            updateUser: updateUser,
            register: register,
            findUserByCredentials: findUserByCredentials,
            findUserByID: findUserByID,
            deleteUser: deleteUser,
            searchUsersByUsername: searchUsersByUsername
        };

        return api;

        function login(username,password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/project/login",user);
        }

        function loggedIn(){
            return $http.get("/api/project/loggedin");
        }

        function logout(){
            return $http.post("/api/project/logout");
        }

        function createUser(newUser) {
            return $http.post("/api/project/user",newUser);
        }

        function register(newUser) {

            return $http.post("/api/project/register",newUser);
        }

        function updateUser(id,newUser) {
            var url = "/api/project/user/" + id;
            return $http.put(url, newUser);
        }

        function findUserByID(id) {
            var url = "/api/project/user/" + id;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function deleteUser(id) {
            var url = "/api/project/user/"+ id;
            return $http.delete(url);
        }

        function searchUsersByUsername(searchText){
            var url = "/api/searchUsers/"+searchText;
            return $http.get(url);
        }
    }

})();