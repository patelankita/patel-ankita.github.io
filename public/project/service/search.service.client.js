
(function (){
    angular
        .module("Bits&Bytes")
        .factory("SearchService",SearchService);

    function SearchService($http) {
        var api = {
            newAnswer: newAnswer,
            newquestion: newquestion,
            searchQuestionByID: searchQuestionByID,
            searchQuestionsByText: searchQuestionsByText,
            findAllUncheckedQuestions: findAllUncheckedQuestions,
            updateQuestion: updateQuestion,
            deleteQuestion: deleteQuestion,
            searchQuestionByUserID:searchQuestionByUserID,
            searchQuestionByStackID: searchQuestionByStackID
        };

        return api;

        function searchQuestionByUserID(uid){
            var url = "/api/project/question/user/"+ uid;
            // console.log(url);
            return $http.get(url);
        }

        function searchQuestionByStackID(qid){
            var url = "/api/project/question/user/stack/"+ qid;
            return $http.get(url);
        }

        function deleteQuestion(id) {
            var url = "/api/project/question/"+ id;

            return $http.delete(url);
        }

        function updateQuestion(qid,newquestion){
            var url = "/api/project/updatequestion";

            return $http.post(url, newquestion);
        }

        function searchQuestionByID(qid){
            var url = "/api/project/searchquestionbyid/"+qid;

            return $http.get(url);
        }

        function newAnswer(question, user_answer , uid) {
            var url = "/api/project/newanswer";
            var send_objects = {
                "question": question,
                "user_answer": user_answer,
                "uid": uid
            };
            return $http.post(url, send_objects);
        }

        function newquestion(question , uid){
            var url = "/api/project/newquestion";
            var send_objects = {
                "question": question,
                "uid": uid
            };
            return $http.post(url, send_objects);
        }

        function searchQuestionsByText(searchText , pageno){
            var url = "/api/project/searchquestionbytext?pageno="+pageno+"&searchtext="+searchText;

            return $http.get(url);
        }

        function findAllUncheckedQuestions(){
            var url ="/api/uncheckedquestions";

            return $http.get(url);
        }
    }
})();