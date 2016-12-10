/**
 * Created by Ankita on 12/7/16.
 */

module.exports = function(app , model) {

    var searchModel = model.projectSearchModel;

    var resultModel = model.projectResultModel;

    app.get("/api/project/findAnswerByQuestion/:qid", findAnswerByQuestion);
    app.get("/api/uncheckedanswers",findAllUncheckedAnswers);
    app.post("/api/project/updateanswer",updateAnswer);
    app.delete("/api/project/answer/:aid",deleteAnswer);
    app.get("/api/project/answer/user/:uid",searchAnswerByUserID);

    function searchAnswerByUserID(req , res){
        var uid = req.params.uid;

        resultModel
            .searchAnswerByUserID(uid)
            .then(
                function(answers){
                    res.json(answers);
                },
                function(error){
                    res.statusCode(404).send(err);
                }
            );
    }

    function deleteAnswer(req, res) {
        var id = req.params.aid;

        resultModel
            .deleteAnswer(id)
            .then(
                function(stats){
                    console.log(stats);
                    res.send(200);
                },
                function(error){
                    res.statusCode(404).send(err);
                }
            );
    }

    function updateAnswer(req,res){
        var newanswer = req.body;

        resultModel
            .updateAnswer(newanswer._id , newanswer)
            .then(
                function(answer){
                    if(answer){
                        res.json(answer);
                    }
                    else
                        res.sendStatus(404);
                },function(err){
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllUncheckedAnswers(req,res){
        resultModel
            .findAllUncheckedAnswers()
            .then(
                function(answers){
                    if(answers){
                        res.json(answers);
                    }
                    else
                        res.statusCode(404);
                },function(err){
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAnswerByQuestion(req,res){
        var qid = req.params.qid;

        var mongo_qid="";

        searchModel
            .findQuestionByStackID(qid)
            .then(
                function(question){
                    if(question){
                        mongo_qid=question._id;
                        resultModel
                            .findAnswerByQuestionID(mongo_qid)
                            .then(
                                function(answers){
                                    res.json(answers);
                                },
                                function(err){
                                    res.json("0");
                                }
                            );
                    }
                    else{
                        searchModel
                            .findQuestionByID(qid)
                            .then(
                                function(question){
                                    if(question){
                                        mongo_qid=question._id;

                                        resultModel
                                            .findAnswerByQuestionID(mongo_qid)
                                            .then(
                                                function(answers){
                                                    res.json(answers);
                                                },
                                                function(err){
                                                    res.json("0");
                                                }
                                            );
                                    }
                                }
                            );
                    }
                },
                function(err){
                    searchModel
                        .findQuestionByID(qid)
                        .then(
                            function(question){
                                if(question){
                                    mongo_qid=question.id;
                                }
                                resultModel
                                    .findAnswerByQuestionID(mongo_qid)
                                    .then(
                                        function(answers){
                                            res.json(answers);
                                        },
                                        function(err){
                                            res.json("0");
                                        }
                                    );
                            }
                        );
                },function(err){
                    res.json("0");
                }
            );
    }
};
