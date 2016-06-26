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
        vm.setScroll = setScroll;
        vm.index = 0;
        vm.forms = ['#signup', '#myname', '#userName', '#password','#email', '#gender', '#country'];

        vm.show = false;

        vm.choose = choose;


        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.countries = [];
        var file = 'data/countries.json';
        vm.contains = contains;
        vm.preload = preload;
        vm.search = search;
        vm.changeMe = changeMe;
        vm.submitUser = submitUser;




        function submitUser(){
            console.log(vm.user);
           // console.log(user);
           // console.log($scope.user);
            $http.post('/project/register', vm.user);
        }







        function choose(country){
            //alert(country);
            vm.user.country = country;
            $("#navcontainer").hide();
        }


        function changeMe(){
            alert("changed");
        }




        vm.firstjump = firstjump;
        vm.social = social;

        
        function  firstjump() {
            setScroll('#myname',1,focusFname);
        }
        
        //  vm.setValue = setValue;

        // hide from dom so will not show while tabbing
        $("#dialog").hide();

        function social() {
            vm.show = true;
            //$(function () {
            $("#dialog").dialog({modal: true, draggable: false, resizable: false, dialogClass: "social"});

            $('.ui-widget-overlay').bind('click',function(){
               // vm.show = !vm.show;
                $('#dialog').dialog('close');
                //$('#dialog').dialog('close').empty()
                //alert(vm.show);
                vm.show = false;
            })
            
        }



        function  focusFname(){
            $('#firstName').focus();
        }

        function focusUser(){
            $('#user').focus();
        }



        /*

        $('html').keydown(function(e) {
            var code = e.keyCode || e.which;
            if (code === 9) {
               // e.preventDefault();
               // setScroll("#myname", 1, focusFname);
                console.log($(':focus').attr('id'));
            }
        });*/


        





        $('#female,#male,#transgender,#other').keydown(function(e) {
            var code = e.keyCode || e.which;
            if (code === 9) {
                 e.preventDefault();
                 setScroll("#country", 6, focusCountry);
               // console.log($(':focus').attr('id'));
            }
        });

        function focusCountry(){
            $('#countryInput').focus();
            //countryInput
        }


        $('#hidden').keydown(function(e) {
            var code = e.keyCode || e.which;
            if (code === 9) {
                e.preventDefault();
                setScroll("#myname", 1, focusFname);
            }
        });



        $('input[name=lastName]').keydown(function(e) {
            var code = e.keyCode || e.which;
            if (code === 9 || code === 13) {
                e.preventDefault();
                setScroll("#userName", 2,focusUser);
            }
        });


        $('#user').keydown(function(e) {
            var code = e.keyCode || e.which;
            if (code === 9 || code === 13) {
                e.preventDefault();
                setScroll("#password", 3, passwordIn);
            }
        });


        function focusThis(id){
            $(id).focus();
        }


        $('#passwordRep').keydown(function(e) {
            var code = e.keyCode || e.which;
            if (code === 9 || code === 13) {
                e.preventDefault();
                setScroll("#email", 4, focusEmail);
            }
        });



        $('#emailInput').keydown(function(e) {
            var code = e.keyCode || e.which;
            if (code === 9 || code === 13) {
                e.preventDefault();
                setScroll("#gender", 5, focusFemale);
            }
        });



        function focusEmail(){
            $('#emailInput').focus();
        }


         function passwordIn(){
             $('#thepassword').focus();
         }

        function focusFemale(){
            $('#female').focus();
        }


        function preload(file) {
            $http.get(file)
                .then(function (res) {
                    vm.countries = res.data;
                    //console.log(vm.countries);
                });
        }

        preload(file);


        function changeState(id, state) {
            $(id).prop("disabled", state);
        }


        function setScroll(id, index, callback) {
            vm.index = index;
            if (index === 0) {
                changeState("#up", true);
                changeState("#down", false);
            } else if (index === vm.forms.length) {
                changeState("#down", true);
                changeState("#up", false);
            } else {
                changeState("#down", false);
                changeState("#up", false);
            }
            smoothScroll(id, callback);
        }

        function previous() {
            if (vm.index > 0) {
                vm.index--;
              $("#down").prop("disabled", false);
                smoothScroll(vm.forms[vm.index]);
            }
            if (vm.index == 0) {
               $("#up").prop("disabled", true);
            }
            return;
        }


        function next() {
            if (vm.index < vm.forms.length - 1) {
                vm.index++;
                $("#up").prop("disabled", false);
                smoothScroll(vm.forms[vm.index]);
            }
            if (vm.index == vm.forms.length - 1) {
                $("#down").prop("disabled", true);
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


        function smoothScroll(id, callback) {
            var offset = $(id).offset().top;

            /*
            $('html, body').animate({
                scrollTop: offset
            }, {
                duration:500,
            complete:callback});*/


            $('html, body').animate({
                scrollTop: offset
            }, 500).promise().done(setTimeout(callback,500));

            //  return $location.hash = old;
        };


        function register() {
        }


        function search(query) {
            var result = [];
            vm.countries.forEach(function (item) {
                if (contains(item.name, query)) {
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


        function contains(str1, str2) {
            str1 = str1.toLowerCase();
            str2 = str2.toLowerCase();
            return (str1.indexOf(str2) != -1);
        }


        function querySearch(query) {
            return search(query);
        }

        function createFilterFor(query) {
            load(query);
        }

        $("#countryInput").focus(function () {
            $('#navcontainer').show();
        });
        
    }
})();
