const { default: mongoose } = require("mongoose");
const mngoose = require("mongoose");
const Schema = mngoose.Schema;

const actionSchema = new Schema({
    actionID : {
        type : String,
        required : true
    },
    actionPlan : {
        type : String,
        required : true
    },
    actionPlanOwner : {
        type : String,
        required : true
    },
    estimatedEndDate : {
        type : Date,
        required : true
    },
    actionStatus : {
        type : String,
        required : true
    }
});

const Action = mongoose.model("Action",actionSchema);
module.exports = Action;