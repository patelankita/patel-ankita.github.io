/**
 * Created by Ankita on 12/9/16.
 */

(function(){
    angular
        .module("Bits&Bytes")
        .controller("AdminHomeController",AdminHomeController);

    function AdminHomeController($location , $routeParams , $sce, UserService , $rootScope , SearchService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.getSafeHTML = getSafeHTML;
        vm.checked = checked;
        vm.deleteQuestion = deleteQuestion;

        function init() {
            init_questions();
        }

        init();

        function init_questions(){
            SearchService
                .findAllUncheckedQuestions()
                .then(
                    function(questions){
                        if(questions) {
                            vm.questions = questions.data;
                        }
                        else
                            vm.message = "There are no questions for review now, check back later";
                    },function(err){
                        vm.error = "There was some error retrieving questions , check back later";
                    }
                );
        }

        function getSafeHTML(text)
        {
            return $sce.trustAsHtml(text);
        }


        function checked(question){
            question.is_checked= true;

            SearchService
                .updateQuestion(question._id,question)
                .then(
                    function(question){
                        init();
                    },function(err){
                        vm.error="There was error marking this question  , please try again later";
                    }
                );
        }

        function deleteQuestion(question){
            var qid = question._id;

            SearchService
                .deleteQuestion(qid)
                .then(
                    function(response){
                        init();
                    },function(err){
                        vm.error="There was error deleting this question  , please try again later";
                    }
                );
        }


    }})();
