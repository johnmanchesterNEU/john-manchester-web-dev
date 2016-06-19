(function(){
    angular
        .module("Project")
        .controller("AutoComplete", AutoComplete);
    function AutoComplete($scope, $location, $anchorScroll, $http) {
        var self = this;
        self.selectedItem  = null;
        self.searchText    = null;
        self.querySearch   = querySearch;
        self.countries = [];
        var file = 'data/countries.json';
        self.contains = contains;
        self.preload = preload;
        self.search = search;
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */

        function preload(file){
            $http.get(file)
                .then(function(res){
                    self.countries = res.data;
                });
        }
        preload(file);

        function search(query){
            var result = [];
            self.countries.forEach(function(item){
            if(contains(item.name, query)){
                //console.log(item.name);
                result.push({
                    value: item.code,
                    display: item.name
                });
            }
        });
            return result;
        }



        function load(query) {
            $http.get(file)
                .then(function(res){
                    //$scope.todos = res.data;
                    //alert($scope.todos[0].name);
                    var countries = [];
                    res.data.map(function(item) {
                        if(contains(item.name, query)){
                            countries.push(item.name);
                            console.log(item.name);
                        }
                        return(countries);
                    });

                });
        }




        function contains(str1, str2){
            str1 = str1.toLowerCase();
            str2 = str2.toLowerCase();
            return (str1.indexOf(str2) != -1);
        }



        function querySearch (query) {
            return search(query);
        }

        function createFilterFor(query) {
            load(query);
        }
    }
})();