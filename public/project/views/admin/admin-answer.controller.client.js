/**
 * Created by Ankita on 12/9/16.
 */

(function(){
    angular
        .module("Bits&Bytes")
        .controller("AdminAnswerController",AdminAnswerController);

    function AdminAnswerController($location , $routeParams , $sce, UserService , SearchService, ResultService) {      /* route paramaters can be retrieved using this */
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.getSafeHTML = getSafeHTML;
        vm.findQuestionByID= findQuestionByID;

        vm.checked = checked;
        vm.deleteAnswer = deleteAnswer ;

        vm.init_questions = init_questions;


        function init() {
            vm.qa=[];
            var q_answers=[];
            vm.answers= [];
            init_answers();
        }

        init();

        function findQuestionByID(qid){



            SearchService
                .searchQuestionByID(qid)
                .then(
                    function(question){
                        title = question.body.title;
                    },function(err){
                        title = "Question might have been deleted , please delete the answer as well";
                    }
                );

            return (title);
        }

        function init_answers(){
            var title;

            ResultService
                .findAllUncheckedAnswers()
                .then(
                    function(answers){
                        if(answers) {
                            q_answers = answers.data;
                            init_questions();
                        }
                        else
                            vm.message = "There are no answers for review now, check back later";
                    },function(err){
                        vm.error = "There was some error retrieving answers , check back later";
                    }
                );
        }

        function init_questions(){
            if(q_answers.length >0)
            {
                var answer = q_answers.pop();
                SearchService
                    .searchQuestionByID(answer.question_id)
                    .then(
                        function(question){
                            var title = question.data.title;
                            answer.question_title = title;
                            vm.answers.push(answer);
                            init_questions();
                        },function(err){
                            var title = "Question might have been deleted , please delete the answer as well";
                            answer.question_title = title;
                            vm.answers.push(answer);
                            init_questions();
                        }
                    );
            }
        }

        function checked(answer){
            answer.is_checked= true;
            delete answer.question_title;

            ResultService
                .updateAnswer(answer._id,answer)
                .then(
                    function(answer){
                        init();
                    },function(err){
                        vm.error="There was error marking this answer  , please try again later";
                    }
                );
        }

        function deleteAnswer(answer){
            var aid = answer._id;

            ResultService
                .deleteAnswer(aid)
                .then(
                    function(response){
                        init();
                    },function(err){
                        vm.error="There was error deleting this answer  , please try again later";
                    }
                );
        }

        function getSafeHTML(text)
        {
            return $sce.trustAsHtml(text);
        }


    }})();
