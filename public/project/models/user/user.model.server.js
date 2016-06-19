model.exports = function () {

var mongoose = require("mongoose");
var UserSchema = require('./user.schema.server');
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser : CreateUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        updateUser: updateUser
    }

    function  createUser() {
        //user.createUser
       return User.create(user);
    }
    function findUserById(userId){
        return User.findById({_id: userId});
    }

    function findUserByUsername(username){
        return User.findOne({username: username});
    }

    function updateUser(userId, user){

        return User
            .update({_id:userId},{
               // $set: user
                $set:{
                    firstName : user.firstName,
                    lastName: user.lastName
                }
            })
    }

    function deleteUser(userId){
        return User.remove({_id:userId});
    }
}