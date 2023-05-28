const { default: mongoose } = require("mongoose");
const mngoose = require("mongoose");
const Schema = mngoose.Schema;

const rgsSchema = new Schema({
    rgsID : {
        type : String,
        required : true
    },
    idnRisk : {
        type : Number,
        required : true
    },
    idnImpLike : {
        type : Number,
        required : true
    },
    idnKpiKri : {
        type : Number,
        required : true
    },
    mitigationTimeline : {
        type : Number,
        required : true
    },
    rgsDate : {
        type : Date,
        required : true
    },
    rgsValue : {
        type : Number,
        required : true
    },
    remarks : {
        type : String,
        required : true
    },
    departmentCode : {
        type : String,
        required : true
    }
});

const RGS = mongoose.model("RGS",rgsSchema);
module.exports = RGS;