(function () {
    angular
        .module("stackApp",[])
        .controller("QuesSearchController",QuesSearchController);

    function QuesSearchController($http){
        console.log("Hellow from controller");
        var vm = this;
        vm.searchQuestion = searchQuestion;

        function searchQuestion(keyword) {
            var url ="https://api.stackexchange.com/2.2/search/advanced?pagesize=100&order=desc&sort=votes&body=as&site=stackoverflow&filter=withbody";
            url = url
                .replace("body=as","body="+keyword);
            $http
                .get(url)
                .success(function (res) {
                    vm.posts = res.items;
                })
            console.log(keyword);
        }


    }
})();
