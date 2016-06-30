(function(){
    angular
        .module("Project")
        .factory("TripService", TripService);

    function TripService($http) {
        var api = {
            tripsForUser : tripsForUser,
            addTrip : addTrip,
            deleteTrip : deleteTrip
        };
        return api;


        function tripsForUser(userId){
            url = "pro/trips/" + userId;
           return $http.get(url);
        }

        function addTrip(userId, trip) {
            url = "pro/trips/" + userId;
          return  $http.put(url,trip);
        }

        function deleteTrip(userId, trip) {
            url = "pro/trips/" + userId;
           return $http.delete(url,trip);
        }
    }
})();
