const { default: mongoose } = require("mongoose");
const mngoose = require("mongoose");
const Schema = mngoose.Schema;

const governanceSchema = new Schema({
    governanceID : {
        type : String,
        required : true
    },
    governanceName : {
        type : String,
        required : true
    },
    governancePwd : {
        type : String,
        required : true
    },
    governanceDesignation : {
        type : String,
        required : true
    },
    governanceMail : {
        type : String,
        required : true
    },
    governancePhone : {
        type : String,
        required : true
    }
});

const Governance = mongoose.model("Governance",governanceSchema);
module.exports = Governance;