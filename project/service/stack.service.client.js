/**
 * Created by Ankita on 12/7/16.
 */
(function(){
    angular
        .module("Bits&Bytes")
        .factory("StackEService", StackEService);

    function StackEService($http) {
        var api = {
            searchQuestions: searchQuestions,
            searchQuestionbyID: searchQuestionbyID,
            searchAnswersByQuestionID: searchAnswersByQuestionID,
            searchQuestionByText:searchQuestionByText
        };
        return api;

        function searchQuestionbyID(qid) {
            url = "https://api.stackexchange.com/2.2/questions/{ids}?order=desc&sort=activity&site=stackoverflow&filter=withbody";
            url = url.replace("{ids}",qid);

            return $http.get(url);
        }



        function searchAnswersByQuestionID(qid){
            url = "https://api.stackexchange.com/2.2/questions/{ids}/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody";
            url = url.replace("{ids}",qid);

            return $http.get(url);
        }

        function searchQuestions(searchTerm,page_number,tags) {

            var url = "https://api.stackexchange.com/2.2/questions/featured?page=1&pagesize=10&order=desc&sort=activity&tagged=TAGS&site=stackoverflow&filter=withbody";

            url = url
                .replace("page=1", "page="+page_number)
                .replace("TAGS",tags);

            if(tags === "")
                url = url.replace("&tagged=","");

            return $http.get(url);
        }

        function searchQuestionByText(searchTerm){
            var url ="https://api.stackexchange.com/2.2/search/advanced?pagesize=100&order=desc&sort=votes&body=as&site=stackoverflow&filter=withbody"

            url = url
                .replace("body=as","body="+searchTerm);

            return $http.get(url);
        }
    }
})();
