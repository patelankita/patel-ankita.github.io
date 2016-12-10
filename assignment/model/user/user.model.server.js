module.exports = function(){
    var model ={};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var userModel= mongoose.model("userModel", UserSchema);

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findFacebookUser: findFacebookUser,
        setModel : setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function findUserById(uid){
        return userModel.findById(uid);
    }

    function findUserByCredentials(username , password){
        return userModel.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }

    function createUser(user){
        return userModel.create(user);
    }

    function deleteUser(uid){
        return userModel.remove({_id: uid});
    }

    function updateUser(userId , nUser){
        // delete nUser._id;

        return userModel
            .update({_id: userId},{
                $set: nUser });
    }

    function findFacebookUser(id){
        return User.findOne({"facebook.id": id});
    }

}
