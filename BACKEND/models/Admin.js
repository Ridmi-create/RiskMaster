const { default: mongoose } = require("mongoose");
const mngoose = require("mongoose");
const Schema = mngoose.Schema;

const adminSchema = new Schema({
    adminID : {
        type : String,
        required : true
    },
    adminName : {
        type : String,
        required : true
    },
    adminPwd : {
        type : String,
        required : true
    }
});

const Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;