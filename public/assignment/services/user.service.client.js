(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [{_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
                    ];
        
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
            if(findUserByUsername(newUser.username)){
                return null;
            }
            else{
                var nUser = {
                    _id :(new Date()).getTime()+"" ,
                    username: newUser.username,
                    password: newUser.password};
                users.push(nUser);
                return nUser;
            }
        }

        function findUserById(userId) {
            for(var u in users) {
                user = users[u];
                if(user._id === userId) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                user = users[u];
                if(    user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function findUserByUsername(username){
            for(var u in users) {
                user = users[u];
                if(user.username === username){
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, newUser) {
            for(var u in users){
                user = users[u];
                if(user._id === userId){
                    user.username = newUser.username;
                    user.firstName = newUser.firstName;
                    user.lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }

        function deleteUser(userId) {
            for(var u in users){
                user = users[u];
                if(user._id === userId){
                    user.splice();
                    return true;
                }
            }
            return false;
        }
    }
})();



