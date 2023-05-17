const { default: mongoose } = require("mongoose");
const mngoose = require("mongoose");
const Schema = mngoose.Schema;

const departmentSchema = new Schema({
    departmentCode : {
        type : String,
        required : true
    },
    departmentName : {
        type : String,
        required : true
    }
});

const Department = mongoose.model("Department",departmentSchema);
module.exports = Department;