(function(){
    angular
        .module("Project")
        .controller("PhotoUploadController", PhotoUploadController).directive("ngFileSelect",function () {
        return {
            scope: { obj: '=' },
            link: function ($scope, element, attrs) {

                function readURL() {

                    //if($scope.obj.type.includes("image")){
                    //console.log($scope.obj.type);
                    //type.includes("video")

                    console.log($scope.obj);


                   // console.log($scope.obj);
                    if ($scope.obj) {
                        console.log("hey");
                        var reader = new FileReader();

                        reader.onload = function (e) {
                           console.log(e);
                          //  console.log(element);
                           var image =  $(element).attr('src', e.target.result);
                        }

                        reader.readAsDataURL($scope.obj);

                        //No Crossbrowser support will have flickr handle this
                        //reader.onloadend = function(e){
                           // var exif = EXIF.readFromBinaryFile(new BinaryFile($scope.obj));

                           // console.log(exif);
                           // var lat = exif.GPSLatitude;
                           // var lon = exif.GPSLongitude;
                        //}

                    }
                //}
            }

                $(element).ready(readURL());


            }
        };
    });

    function PhotoUploadController($scope, $location, $q, $log) {

        var vm = this;
        vm.vidMaxBytes =   8589934592; //flickrs upload max
        vm.photoMaxBytes = 1677721600;

        // the list of files
        vm.files = new Array();
        vm.error = null;
        //vm.fileReader = fileReader;
        var preview = document.querySelector('#preview');

        vm.load = load;

        vm.previewFiles = previewFiles;

        vm.remove = remove;

        vm.upload = upload;



        function upload(){
            console.log("upload");
        }


        function remove(index){
            console.log(index);

           // console.log(vm.files);

            // remove file from upload list
            vm.files.splice(index, 1);
          //  console.log(vm.files);
        }

        function previewFiles() {

            var preview = document.querySelector('#preview');
            var files   = document.querySelector('input[type=file]').files;

            function readAndPreview(file) {

                // Make sure `file.name` matches our extensions criteria
                if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
                    var reader = new FileReader();

                    reader.addEventListener("load", function () {
                        var image = new Image();
                        image.height = 100;
                        image.title = file.name;
                        image.src = this.result;
                        preview.appendChild( image );
                    }, false);

                    reader.readAsDataURL(file);
                }

            }

            if (files) {
                [].forEach.call(files, readAndPreview);
            }

        }
















        function  load(el, file) {
          // console.log(el);
          //  console.log(file);
        }


        $scope.getFile = function () {
            $scope.progress = 0;


            //readAsDataUrl($scope.file, $scope);


            //console.log(readAsDataUrl($scope.file, $scope));
            //fileReader.readAsDataUrl($scope.file, $scope)
            //   .then(function(result) {
            //   $scope.imageSrc = result;
            //   });
            //   });
        };

        $scope.$on("fileProgress", function(e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });





        $scope.uploadedFile = function(element) {
            console.log(element.files);

            //vm.files.push($scope.files);
            //vm.files = element.files;

            //vm.files.push(element.files);


            for (var i = 0; i < element.files.length; i++) {

                //console.log(event.target.result);
                // console.log(element.files[i]);
                element.files.index = vm.files.length + i;
                // get item
                //file = files.item(i);
                //or

                console.log(element.files[i].description);
                console.log(element.files[i].type);
                console.log(element.files[i].size);
                if(element.files[i].type.includes("image") && element.files[i].size <= vm.photoMaxBytes){
                    vm.files.push(element.files[i]);
                }
                else if(element.files[i].type.includes("video") && element.files[i].size <= vm.vidMaxBytes){
                    vm.files.push(element.files[i]);
                }else{
                    vm.error = "Flickr images must be less than 200MB and videos less than 1GB."

                }


                //var reader  = new FileReader();

               // reader.addEventListener("load", function () {
                //    preview.src = reader.result;
                //}, false);

              //  if (element.files[i]) {
                    //console.log;
                 //   reader.readAsDataURL(element.files[i]);
                  //  preview.src = reader.result;
             //   }


                //  alert(file.name);
            }


            $scope.$apply(function($scope) {
                /* $scope.files = element.files;

                 var reader = new FileReader();

                 for (var files in $scope.files){
                 console.log(typeof files);
                 }


                 console.log(reader);
                 reader.onload = function (e) {
                 console.log(e.target.result);
                 }*/
            });
        }





    }
})();