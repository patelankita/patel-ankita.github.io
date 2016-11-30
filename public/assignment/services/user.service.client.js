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
            deleteUser : deleteUser
        };
        return api;

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
            // console.log(url);
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



