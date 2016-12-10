/**
 * Created by Ankita on 12/7/16.
 */

module.exports = function(app , model) {

    var searchModel = model.projectSearchModel;

    var resultModel = model.projectResultModel;

    app.post("/api/project/newanswer", newAnswer);
    app.post("/api/project/newquestion", newQuestion);
    app.get("/api/project/searchquestionbyid/:qid", searchQuestionByID);
    app.get("/api/project/searchquestionbytext",searchQuestionByText);
    app.get("/api/uncheckedquestions",findAllUncheckedQuestions);
    app.post("/api/project/updatequestion",updateQuestion);
    app.delete("/api/project/question/:qid",deleteQuestion);
    app.get("/api/project/question/user/:uid",searchQuestionByUserID);
    app.get("/api/project/question/user/stack/:qid",searchQuestionByStackID);

    function searchQuestionByStackID(req,res){
        var qid = req.params.qid;

        searchModel
            .findQuestionByStackID(qid)
            .then(
                function(question){
                    res.json(question);
                },
                function(error){
                    res.statusCode(404).send(err);
                }
            );
    }

    function searchQuestionByUserID(req,res){
        var uid = req.params.uid;

        searchModel
            .searchQuestionByUserID(uid)
            .then(
                function(questions){
                    res.json(questions);
                },
                function(error){
                    res.statusCode(404).send(err);
                }
            );
    }

    function deleteQuestion(req, res) {
        var id = req.params.qid;

        searchModel
            .deleteQuestion(id)
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

    function updateQuestion(req,res){
        var newquestion = req.body;

        searchModel
            .updateQuestion(newquestion._id , newquestion)
            .then(
                function(question){
                    if(question){
                        res.json(question);
                    }
                    else
                        res.sendStatus(404);
                },function(err){
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllUncheckedQuestions(req,res){
        searchModel
            .findAllUncheckedQuestions()
            .then(
                function(questions){
                    if(questions){
                        res.json(questions);
                    }
                    else
                        res.statusCode(404);
                },function(err){
                    res.statusCode(400).send(error);
                }
            );
    }

    function searchQuestionByText(req,res){
        var pageno = req.query.pageno;
        var searchtext = req.query.searchtext;

        searchModel
            .findQuestionByText(searchtext)
            .then(
                function(questions) {
                    if (questions) {
                        // var res_questions=[];
                        // if(questions.length >= (pageno * 10))
                        //     res_questions= questions.slice(((pageno*10)-10) , ((pageno*10)+10));
                        // else if(questions.length < (pageno * 10) && questions.length > ((pageno * 10)-10))
                        //     res_questions= questions.slice(((pageno*10)-10) , questions.length);
                        // else if(questions.length <= ((pageno * 10)-10))
                        //     res_questions=null;
                        res.json(questions);
                    }
                    else {
                        res.statusCode(404);
                    }
                },function(error){
                    res.statusCode(404).send(error);
                });
    }

    function  searchQuestionByID(req,res){
        var qid = req.params.qid;

        searchModel
            .findQuestionByID(qid)
            .then(
                function(question) {
                    if(question)
                        res.json(question);
                    else
                        res.statusCode(404);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function newQuestion(req,res){
        var recv_objects = req.body;
        var question = {
            stackQuestion: false,
            title: recv_objects.question.title,
            body: recv_objects.question.body,
            posted_by: recv_objects.uid
        }

        searchModel
            .createQuestion(question)
            .then(
                function(new_question){
                    res.json(new_question);
                },
                function(err){
                    res.send(err);
                }
            )
    }


    function addAnswerByQuestionID(qid,new_answer,question,uid,res){
        searchModel
            .findQuestionByID(qid)
            .then(
                function(res_question){
                    if(res_question){
                        addAnswer(res_question,new_answer);
                    }
                    else{
                        addQuestionthenAnswer(qid,new_answer,question,uid);
                    }
                },
                function(err){
                    addQuestionthenAnswer(qid,new_answer,question,uid);
                }
            );
    }

    function newAnswer(req,res) {
        var send_objects = req.body;
        var question = send_objects.question;
        var user_answer = send_objects.user_answer;
        var uid = send_objects.uid;

        var ques_found = false;

        var new_answer = {
            body: user_answer,
            answered_by: uid
        };

        if(question.question_id)
        {
            searchModel
                .findQuestionByStackID(question.question_id)
                .then(
                    function(res_question){
                        if(res_question){
                            addAnswer(res_question,new_answer,res);
                        }
                        else{
                            addAnswerByQuestionID(question.question_id,new_answer,question,uid,res);
                        }
                    }
                );
        }
        else {
            searchModel
                .findQuestionByID(question._id)
                .then(
                    function(res_question){
                        if(res_question){
                            addAnswer(res_question,new_answer,res);
                        }
                        else{
                            addAnswerByQuestionID(question.question_id,new_answer,question,uid,res);
                        }
                    }
                );
        }
    }

    function addAnswer(question,new_answer,res){
        new_answer.question_id = question._id;
        resultModel
            .createAnswer(new_answer)
            .then(
                function(answer){
                    var answers = question.answers;
                    answers.push(answer._id);
                    question.answers = answers;
                    return searchModel
                        .updateQuestion(question._id,question)
                },
                function(err){
                    return err;
                }
            )
            .then(
                function(question){
                    res.send(200);
                },
                function(err){
                    return err;
                }
            );
    }

    function addQuestionthenAnswer(question_id,new_answer,question,uid,res){
        var new_question={
            stackQuestion: true,
            title: question.title,
            body: question.body,
            posted_by: uid,
            stackoverflow: {
                id: question_id
            },
            tags: question.tags
        }

        searchModel
            .createQuestion(new_question)
            .then(
                function(question){
                    addAnswer(question,new_answer);
                }
            );
    }
};
