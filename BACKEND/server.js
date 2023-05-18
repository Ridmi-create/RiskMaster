const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    //useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //useFindAndModify:false
});

const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Mongodb connection successful!");
});

app.listen(PORT, () => {
    console.log('Server is up and running on port:'+ PORT)
});

const riskRouter = require("./routes/Risk.js");
app.use("/Risk",riskRouter);

const actionRouter = require("./routes/Action.js");
app.use("/Action",actionRouter);

const adminRouter = require("./routes/Admin.js");
app.use("/Admin",adminRouter);

const departmentRouter = require("./routes/Department.js");
app.use("/Department",departmentRouter);

const governanceRouter = require("./routes/Governance.js");
app.use("/Governance",governanceRouter);

const rgsRouter = require("./routes/RGS.js");
app.use("/RGS",rgsRouter);

const riskOwnerRouter = require("./routes/RiskOwner.js");
app.use("/RiskOwner",riskOwnerRouter);
