(function(){
    angular
        .module("Bits&Bytes")
        .config(Config);        /*specific function to handle configuration */

    function Config($routeProvider){   /*Well know angular object in ng-modular ,  used for dependency injection*/
        $routeProvider
            .when("/" , {
                templateUrl:"views/home/homePage.view.client.html",
                controller: "HomePageController",
                controllerAs: "model"
            })
            .when("/result/:qid" , {
                templateUrl:"views/home/homeRes.view.client.html",
                controller: "HomeResController",
                controllerAs: "model"
            })
            .when("/login" , {
                templateUrl:"views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile" , {
                templateUrl:"views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/register" , {
                templateUrl:"views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/search/:uid" , {

                templateUrl:"views/user/user-search.view.client.html",
                controller: "UserSearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/public/:uid" , {
                templateUrl:"views/user/my-profile.view.client.html",
                controller: "MyProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/admin/user" , {
                templateUrl:"views/admin/admin-user.view.client.html",
                controller: "UserSearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/admin/answer" , {
                templateUrl:"views/admin/admin-answer.view.client.html",
                controller: "AdminAnswerController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/admin/question" , {
                templateUrl:"views/admin/admin-home.view.client.html",
                controller: "AdminHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/question/new", {
                templateUrl: "views/search/search-new.view.client.html",
                controller: "SearchNewController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/question/:qid", {
                templateUrl: "views/search/search-interact.view.client.html",
                controller: "SearchInteractController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/question" , {
                templateUrl:"views/search/search-home.view.client.html",
                controller: "SearchHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/admin/question/:qid" , {
                templateUrl:"views/admin/admin-question.view.client.html",
                controller: "AdminQuestionController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid" , {
                templateUrl:"views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user" , {
                templateUrl:"views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .otherwise({
                redirectTo: "/login"
            });

        function checkLoggedIn(UserService,$location,$q,$rootScope,$window){
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function(res){
                        var user = res.data;
                        // console.log(user);
                        if(user ==  '0'){
                            console.log(user._id);
                            $rootScope.currentUser = null;
                            $window.sessionStorage.setItem("currentUser",'0');
                            $window.sessionStorage.setItem("currentUsername",'0');
                            $window.sessionStorage.clear();
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            console.log(user._id);
                            $rootScope.currentUser = user;
                            $window.sessionStorage.setItem("currentUser",user._id);
                            $window.sessionStorage.setItem("currentUsername",user.username);
                            deferred.resolve();
                        }
                    },
                    function(err){
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }

    }
})();