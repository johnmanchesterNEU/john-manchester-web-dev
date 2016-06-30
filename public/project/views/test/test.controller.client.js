(function(){
    angular
        .module("Project")
        .controller("TestController", TestController);

    function TestController($location, $http) {


        var vm = this;


        $(function(){
            var $geocomplete = $("#geocomplete"),
                $multiple = $("#multiple");

            $geocomplete
                .geocomplete({ map: ".map_canvas" })
                .bind("geocode:multiple", function(event, results){
                    $.each(results, function(){
                        var result = this;
                        $("<li>")
                            .html(result.formatted_address)
                            .appendTo($multiple)
                            .click(function(){
                                $geocomplete.geocomplete("update", result)
                            });
                    });
                });

            $("#find").click(function(){
                $("#geocomplete").trigger("geocode");
            });

        });


    }
})();