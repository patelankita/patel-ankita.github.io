/**
 * Created by Ankita on 12/8/16.
 */
(function(){
    angular
        .module("Bits&Bytes")
        .controller("HomeResController",HomeResController);

    function HomeResController($sce, $location,$routeParams,StackEService,SearchService,ResultService,UserService) {
        var vm = this;
        // vm.uid=$routeParams.uid;
        vm.qid=$routeParams.qid;
        console.log(vm.qid);

        vm.searchQuestionbyID = searchQuestionbyID;
        vm.searchAnswersByQuestionID = searchAnswersByQuestionID;
        // vm.saveAnswer = saveAnswer;
        // vm.cancelAnswer = cancelAnswer;
        vm.getSafeHTML = getSafeHTML;
        vm.searchQuestionInDB = searchQuestionInDB;
        vm.login = login;
        // vm.updateAnswer = updateAnswer;
        // vm.updateQuestion = updateQuestion;

        function init() {
            vm.answers=[];
            vm.temp_answers=[];
            // cancelAnswer();
            searchQuestionbyID(vm.qid);
            searchAnswersByQuestionID(vm.qid);
            // searchAnswersByQuestionIDinDB(vm.qid);
        }

        init();

        function login(){
            $location.url("/login");
        }


        function searchQuestionbyID(qid) {
            StackEService
                .searchQuestionbyID(qid)
                .then(
                    function(response){
                        if(response){
                            vm.question = response.data.items[0];
                            vm.question.asked_by="StackOverflow";
                        }
                        else
                            searchQuestionInDB(qid);
                    },function(err){
                        searchQuestionInDB(qid);
                    }
                );
        }

        function searchQuestionInDB(qid){
            SearchService
                .searchQuestionByID(qid)
                .then(
                    function(question){
                        if(question){
                            vm.question = question.data;
                            UserService
                                .findUserByID(vm.question.posted_by)
                                .then(
                                    function(user){
                                        vm.question.asked_by=user.data.username;
                                    }
                                )
                        }
                    }
                );
        }

        function searchAnswersByQuestionID(qid) {
            StackEService
                .searchAnswersByQuestionID(qid)
                .then(
                    function(response){
                        vm.answers=response.data.items;
                    });
        }

        //
        // function init_asked_by(n){
        //     if(n >0)
        //     {
        //         var answer = vm.temp_answers[n-1];
        //         UserService
        //             .findUserByID(answer.answered_by)
        //             .then(
        //                 function(user){
        //                     answer.asked_by = user.data.username;
        //                     vm.answers.push(answer);
        //                     init_asked_by(n-1);
        //                 },function(err){
        //                     answer.asked_by = "StackOverflow";
        //                     vm.answers.push(answer);
        //                     init_asked_by(n-1);
        //                 }
        //             );
        //     }
        // }

        function getSafeHTML(text)
        {
            return $sce.trustAsHtml(text);
        }
    }
})();
