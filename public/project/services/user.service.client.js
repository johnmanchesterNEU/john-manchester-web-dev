(function(){
    angular
        .module("Project")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername,
            login: login,
            logout: logout,
            checkLoggedin: checkLoggedin,
            loggedIn : loggedIn,
            register: register,
            unregister: unregister,
            unflickr: unflickr,
            updateFlickr:updateFlickr
        };
        return api;


        function unflickr(id) {
            var url = "/pro/unflickr/" + id;
            return $http.get(url);
        }


        function unregister(id){
            var url = "/pro/unregister/" + id;
            return $http.get(url);
        }


        function checkLoggedin() {
            return $http.get("/api/loggedin");
        }


        function register(user) {
            return $http.post("/api/register", user);
        }



        function loggedIn(){
            return $http.get("/api/loggedIn")
        }

        function logout(){
            return $http.post("/api/logout");
        }

        function login(user){
            var url = "/api/login";
            console.log(user);
            return $http.post(url, user);
        }



        function createUser(user) {
          //  delete user.verify;
            //newUser.verify = null;
         /*   var user = {
                username: newUser.username,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                password: newUser.password,
                email: newUser.email,
                dateOfBirth: newUser.dateOfBirth
            };*/
            //alert("HERE");
           // console.log(newUser)
            return $http.post("/api/user", user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function updateUser(id, newUser) {
            var url = "/pro/user/" + id;
            return $http.put(url, newUser);
        }

        function updateFlickr(id, newUser) {
            var url = "/pro/flickr/" + id;
            return $http.put(url, newUser);
        }



        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url = "api/user?username=username";
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
    }
})();