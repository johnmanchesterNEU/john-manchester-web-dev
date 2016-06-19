(function() {
    angular
        .module("smoothScroll", [])
        .directive("smoothScroll", smoothScroll);

    return {
        restrict: 'A',
        link: function(scope, $elm) {
            $elm.on('click', function() {
                $("body").animate({scrollTop: $elm.offset().top}, "slow");
            });
        }
    }


})();























/*(function() {
    angular
        .module("Project", [])
        .directive("smoothScroll", smoothScroll);

    function smoothScroll($scope, $location, $anchorScroll){
        function jumpTo(id) {

            alert(id);
            var target = $location.hash(id);
           // $('a[href*="#"]:not([href="#"])').click(function() {
            //    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    //var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
        };
    }

})();*/
/*
 $(function() {
 $('a[href*="#"]:not([href="#"])').click(function() {
 if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
 var target = $(this.hash);
 target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
 if (target.length) {
 $('html, body').animate({
 scrollTop: target.offset().top
 }, 1000);
 return false;
 }
 }
 });
 });
 */