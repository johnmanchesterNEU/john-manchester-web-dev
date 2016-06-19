(function () {
    angular
        .module("Project")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope, $location, $anchorScroll, $window, $http) {
        var vm = this;
        vm.register = register;
        vm.jumpTo = jumpTo;
        vm.next = next;
        vm.previous = previous;
        vm.changeState = vm.changeState;
        vm.smoothScroll = smoothScroll;
        vm.setScroll=setScroll;
        vm.index = 0;
        vm.forms = ['#myname', '#userName', '#gender', '#country'];




        vm.selectedItem  = null;
        vm.searchText    = null;
        vm.querySearch   = querySearch;
        vm.countries = [];
        var file = 'data/countries.json';
        vm.contains = contains;
        vm.preload = preload;
        vm.search = search;


      //  vm.setValue = setValue;



        function preload(file){
            $http.get(file)
                .then(function(res){
                    vm.countries = res.data;
                    console.log(vm.countries);
                });
        }
        preload(file);


        function changeState(id, state){
            $(id).prop("disabled",state);
        }


        function setScroll(id, index) {
            vm.index = index;
            if(index === 0){
                changeState("#up", true);
                changeState("#down", false);
            }else if(index === 3){
                changeState("#down", true);
                changeState("#up", false);
            }else{
                changeState("#down", false);
                changeState("#up", false);
            }
            smoothScroll(id);
        }

        function  previous() {
            if(vm.index > 0){
                vm.index--;
               $("#down").prop("disabled",false);
                smoothScroll(vm.forms[vm.index]);
            }
            if(vm.index == 0){
                $("#up").prop("disabled", true);
            }
            return;
        }


        function next() {
            if(vm.index < vm.forms.length - 1){
                 vm.index++;
                $("#up").prop("disabled", false);
               smoothScroll(vm.forms[vm.index]);
            }
            if(vm.index == vm.forms.length -1) {
                $("#down").prop("disabled",true);
            }
            return;
        }




        function jumpTo(id) {
            //alert(name);
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        };


        function smoothScroll(id) {
            var offset =  $(id).offset().top;

            $('html, body').animate({
                scrollTop: offset
            }, 1000);

          //  return $location.hash = old;
        };


        function register() {
        }



        function search(query){
            var result = [];
            vm.countries.forEach(function(item){
                if(contains(item.name, query)){
                    //console.log(item.name);
                    result.push({
                        value: item.code,
                        display: item.name
                    });
                }
            });
            console.log(result);
            return result;
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

        $( "#countryInput" ).focus(function() {
            $('#navcontainer').show();
        });

        $('#uItem li').click(function() {
            alert(this.id); // id of clicked li by directly accessing DOMElement property
            alert($(this).attr('id')); // jQuery's .attr() method, same but more verbose
            alert($(this).attr('value'));
            alert($(this).html()); // gets innerHTML of clicked li
            alert($(this).text()); // gets text contents of clicked li
        });


    }
})();

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



/*(function(){
 angular
 .module("WebAppMaker")
 .controller("RegisterController", RegisterController);

 function RegisterController($location, UserService) {
 var vm = this;
 vm.createUser = createUser;
 vm.submitForm = submitForm;
 vm.close = close;
 //vm.user.dateOfBirth = new Date();

 function close() {
 vm.success = false;
 }


 function submitForm(isValid) {
 if (isValid) {
 createUser();
 }

 };


 function createUser() {
 if(UserService.findUserByUsername(vm.user.username)) {
 vm.success = true;
 vm.error = "Could Not Create User";
 }else{
 var user =  UserService.createUser(vm.user);
 $location.url("/user/" + user._id + "/website/");
 }
 }
 }


 })();*/