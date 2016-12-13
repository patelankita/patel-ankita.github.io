/**
 * Created by Ankita on 12/7/16.
 */

(function(){
    angular
        .module("Bits&Bytes")
        .controller("SearchNewController",SearchNewController);

    function SearchNewController($sce, $location,$routeParams,SearchService, ResultService) {
        var vm = this;
        vm.uid=$routeParams.uid;

        vm.saveQuestion = saveQuestion;
        vm.cancelQuestion = cancelQuestion;
        vm.homeRedirect = homeRedirect;

        function cancelQuestion(){
            // $location.url("/user/"+vm.uid+"/question/"+question.data._id);

                $location.url("/user/public/" + vm.uid);



        }

        function homeRedirect(){
            $location.url("/user/public/"+ vm.uid);
        }

        function saveQuestion(){
            // console.log(vm.question);

            SearchService
                .newquestion(vm.question,vm.uid)
                .then(
                    function(question){
                        if(question)
                        {
                            $location.url("/user/"+vm.uid+"/question/"+question.data._id);
                        }
                        else{
                            vm.error = "Cannot create question , please try again";
                        }
                    }, function(err){
                        vm.error = "Cannot create question , please try again";
                    }
                )
        }
    }
})();
