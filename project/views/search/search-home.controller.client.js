(function(){
    angular
        .module("Bits&Bytes")
        .controller("SearchHomeController",SearchHomeController);

    function SearchHomeController($location,$sce,$filter,$routeParams,StackEService,SearchService,$window,ResultService) {
        var vm = this;
        vm.uid=$routeParams.uid;
        vm.getSafeHTML = getSafeHTML;
        vm.searching=false;
        vm.paginate=paginate;
        vm.goBack=goBack;
        vm.goProfile=goProfile;
        vm.goPublicProfile=goPublicProfile;

        vm.searchFeaturedQuestions = searchFeaturedQuestions;
        vm.searchQuestions = searchQuestions;
        vm.redirectTo = redirectTo;
        vm.homeRedirect = homeRedirect;

        function init() {
            vm.pageno=1;
            vm.ques={
                searchText:""
            };
            vm.userid_q_search = false;
            vm.answerSearch = false;

            if ($window.sessionStorage.getItem("quesSearchByUser"))
            {
                vm.username = $window.sessionStorage.getItem("quesSearchByUser_Username");
                searchQuestionsByUser($window.sessionStorage.getItem("quesSearchByUser"));
            }
            else if ($window.sessionStorage.getItem("answerSearchByUser"))
            {
                vm.all_questions = [];
                vm.username = $window.sessionStorage.getItem("answerSearchByUser_Username");
                searchAnswersByUser($window.sessionStorage.getItem("answerSearchByUser"));
            }
            else if($window.sessionStorage.getItem("quesSearch"))
            {
                vm.ques.searchText = $window.sessionStorage.getItem("quesSearch");
                searchQuestions(vm.ques.searchText, 1);
            }
            else {
                searchFeaturedQuestions(1);
            }
        }

        init();

        function homeRedirect(){
            $location.url("/user/public/" + vm.uid);
        }

        function redirectTo(){
            $location.url("/user/"+vm.uid+"/question/new");
        }

        function searchAnswersByUser(uid){
            ResultService
                .searchAnswerByUserID(uid)
                .then(
                    function(answers){
                        vm.answers = answers.data;
                        searchQuestionsByAnswers(vm.answers.length);
                    },function(err){
                        vm.error="Error retreiving  answers now , please try again later";
                    }
                )
        }

        function searchQuestionsByAnswers(n){
            if(n>0){
                SearchService
                    .searchQuestionByID(vm.answers[n-1].question_id)
                    .then(
                        function(question){
                            var question_present = false;
                            for (var i in vm.all_questions){
                                if(vm.all_questions[i]._id === question.data._id)
                                    question_present = true;
                            }

                            if(!question_present){
                                vm.all_questions.push(question.data);
                            }

                            searchQuestionsByAnswers(n-1);
                        },function(err){
                            vm.error = "Error retreiving few questions";
                            searchQuestionsByAnswers(n-1);
                        }
                    )
            }
            else{
                for (var i in vm.all_questions){
                    vm.all_questions[i].answer_count=vm.all_questions[i].answers.length;
                    vm.all_questions[i].creation_date=vm.all_questions[i].dateCreated;
                    vm.all_questions[i].question_id=vm.all_questions[i]._id;
                }
                vm.questions=vm.all_questions;
                vm.answerSearch = true;
            }
        }

        function goBack(){
            $window.sessionStorage.removeItem("quesSearchByUser");
            $window.sessionStorage.removeItem("quesSearchByUser_Username");
            $window.sessionStorage.removeItem("quesSearch");
            $window.sessionStorage.removeItem("answerSearchByUser_Username");
            $window.sessionStorage.removeItem("answerSearch");
            $window.history.back();
        }

        function goProfile(){
            $window.sessionStorage.removeItem("quesSearchByUser");
            $window.sessionStorage.removeItem("quesSearchByUser_Username");
            $window.sessionStorage.removeItem("quesSearch");
            $location.url("/user/" +vm.uid);
        }

        function goPublicProfile(){
            $window.sessionStorage.removeItem("quesSearchByUser");
            $window.sessionStorage.removeItem("quesSearchByUser_Username");
            $window.sessionStorage.removeItem("quesSearch");
            console.log("patel says i am here");
            $location.url("/user/public/"+ vm.uid);
        }

        function searchQuestionsByUser(uid){
            SearchService
                .searchQuestionByUserID(uid)
                .then(
                    function(questions){
                        vm.all_questions = questions.data;
                        for (var i in vm.all_questions){
                            vm.all_questions[i].answer_count=vm.all_questions[i].answers.length;
                            vm.all_questions[i].creation_date=vm.all_questions[i].dateCreated;
                            vm.all_questions[i].question_id=vm.all_questions[i]._id;
                        }
                        vm.userid_q_search = true;
                        vm.questions=vm.all_questions;
                    },function(err){
                        vm.error = "Unable to fetch questions and answers";
                    }
                );
        }

        function searchQuestions(searchText , pageno) {
            $window.sessionStorage.setItem("quesSearch",searchText);

            $window.sessionStorage.removeItem("quesSearchByUser");
            $window.sessionStorage.removeItem("quesSearchByUser_Username");
            $window.sessionStorage.removeItem("quesSearch");
            $window.sessionStorage.removeItem("answerSearchByUser_Username");
            $window.sessionStorage.removeItem("answerSearch");

            vm.answerSearch = false;
            vm.userid_q_search = false;

            if(searchText === "")
                searchFeaturedQuestions(pageno);
            else {
                SearchService
                    .searchQuestionsByText(searchText , pageno)
                    .then(
                        function(questions) {
                            vm.all_questions = questions.data;
                            for (var i in vm.all_questions){
                                vm.all_questions[i].answer_count=vm.all_questions[i].answers.length;
                                vm.all_questions[i].creation_date=vm.all_questions[i].dateCreated;
                                vm.all_questions[i].question_id=vm.all_questions[i]._id;
                            }
                            vm.searching = true;
                            StackEService
                                .searchQuestionByText(searchText)
                                .then(
                                    function (response) {
                                        vm.all_questions = vm.all_questions.concat(response.data.items);
                                        for (var i in vm.all_questions) {
                                            var utcSeconds = vm.all_questions [i].creation_date;
                                            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                                            d.setUTCSeconds(utcSeconds);
                                            vm.all_questions [i].creation_date = d;
                                        }
                                        paginate(vm.pageno);
                                    });
                        });
            }
        }

        function searchFeaturedQuestions(pageno) {
            vm.pageno = pageno;
            StackEService
                .searchQuestions("", vm.pageno,"")
                .then(
                    function(response){
                        // console.log(response);
                        vm.questions = response.data.items;
                        for(var i in vm.questions){
                            var utcSeconds = vm.questions[i].creation_date;
                            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                            d.setUTCSeconds(utcSeconds);
                            vm.questions[i].creation_date= d;
                        }
                    });
        }

        function paginate(pageno){
            vm.pageno =pageno;
            vm.questions=[];
            if(vm.ques.searchText === ""){
                searchFeaturedQuestions(pageno);
            }
            else {
                for(var i in vm.all_questions){
                    if(i>=((vm.pageno*10)-10) && i < ((vm.pageno)*10))
                        vm.questions.push(vm.all_questions[i]);
                }
            }
        }

        function getSafeHTML(text)
        {
            var content = $filter('limitTo')(text, 150);
            return  $sce.trustAsHtml(content);
        }
    }
})();