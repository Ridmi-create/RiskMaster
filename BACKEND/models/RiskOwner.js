const { default: mongoose } = require("mongoose");
const mngoose = require("mongoose");
const Schema = mngoose.Schema;

const riskOwnerSchema = new Schema({
    riskOwnerID : {
        type : String,
        required : true
    },
    riskOwnerName : {
        type : String,
        required : true
    },
    riskOwnerPwd : {
        type : String,
        required : true
    },
    riskOwnerDesignation : {
        type : String,
        required : true
    },
    riskOwnerMail : {
        type : String,
        required : true
    },
    riskOwnerPhone : {
        type : String,
        required : true
    }
});

const RiskOwner = mongoose.model("RiskOwner",riskOwnerSchema);
module.exports = RiskOwner;