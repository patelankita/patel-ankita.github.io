/**
 * Created by Ankita on 12/7/16.
 */

module.exports = function(){

    var mongoose = require("mongoose");

    var SearchSchema = require("./search.schema.server")();

    var Question= mongoose.model("ProjectSearch", SearchSchema);

    var api = {
        createQuestion: createQuestion,
        deleteQuestion: deleteQuestion,
        updateQuestion: updateQuestion,
        findQuestionByStackID: findQuestionByStackID,
        findQuestionsByUser: findQuestionsByUser,
        findQuestionByID:findQuestionByID,
        findQuestionByText: findQuestionByText,
        findAllUncheckedQuestions: findAllUncheckedQuestions,
        searchQuestionByUserID: searchQuestionByUserID
    };

    return api;

    function searchQuestionByUserID(uid){
        return Question.find({"posted_by": uid}).sort('-dateCreated');
    }

    function findAllUncheckedQuestions(){
        return Question.find({"is_checked": false}).sort('-dateCreated');
    }

    function findQuestionByText(searchtext){
        return Question.find({"body":{ "$regex": searchtext, "$options": "i"}}).sort('-dateCreated');
    }

    function findQuestionByStackID(id){
        return Question.findOne({"stackoverflow.id": id});
    }

    function findQuestionsByUser(uid){
        return Question.find({posted_by: uid});
    }

    function findQuestionByID(qid){
        return Question.findOne({ _id: qid});
    }

    function createQuestion(question){
        return Question.create(question);
    }

    function deleteQuestion(qid){
        return Question.remove({_id: qid});
    }

    function updateQuestion(qid , newquestion){
        delete newquestion._id;

        return Question
            .update({_id: qid},{
                $set: newquestion
            });
    }
}
