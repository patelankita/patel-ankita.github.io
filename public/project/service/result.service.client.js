/**
 * Created by Ankita on 12/7/16.
 */

(function (){
    angular
        .module("Bits&Bytes")
        .factory("ResultService",ResultService);

    function ResultService($http) {
        var api = {
            searchAnswersByQuestionID: searchAnswersByQuestionID,
            findAllUncheckedAnswers: findAllUncheckedAnswers,
            updateAnswer: updateAnswer,
            deleteAnswer: deleteAnswer,
            searchAnswerByUserID:searchAnswerByUserID
        };

        return api;

        function searchAnswerByUserID(uid) {
            console.log("in client");
            console.log(uid);
            var url = "/api/project/answer/user/"+ uid;
            console.log(url);
            return $http.get(url);
        }

        function deleteAnswer(id) {
            var url = "/api/project/answer/"+ id;
            return $http.delete(url);
        }

        function updateAnswer(aid,newanswer){
            var url = "/api/project/updateanswer";
            return $http.post(url, newanswer);
        }

        function findAllUncheckedAnswers(){
            var url ="/api/uncheckedanswers";
            return $http.get(url);
        }

        function searchAnswersByQuestionID(qid) {
            var url = "/api/project/findAnswerByQuestion/"+qid;
            return $http.get(url);
        }
    }
})();
