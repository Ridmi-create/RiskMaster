const { default: mongoose } = require("mongoose");
const mngoose = require("mongoose");
const Schema = mngoose.Schema;

const riskSchema = new Schema({
    riskCode : {
        type : String,
        required : true
    },
    project : {
        type : String,
        required : true
    },
    specificRisk : {
        type : String,
        required : true
    },
    riskRating : {
        type : Number,
        required : true
    },
    impact : {
        type : Number,
        required : true
    },
    likelihood : {
        type : Number,
        required : true
    },
    reportedDate : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    KpiKri : {
        type : String,
        required : true
    }
});

const Risk = mongoose.model("Risk",riskSchema);
module.exports = Risk;