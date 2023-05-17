const router = require("express").Router();
let Risk = require("../models/Risk");

//add new risk
router.route("/add").post((req,res)=>{
    const riskCode = req.body.riskCode;
    const project = req.body.project;
    const specificRisk = req.body.specificRisk;
    const riskRating = req.body.riskRating;
    const impact = req.body.impact;
    const likelihood = req.body.likelihood;
    const reportedDate = req.body.reportedDate;
    const status = req.body.status;
    const KpiKri = req.body.KpiKri;

    const newRisk = new Risk({
        riskCode,
        project,
        specificRisk,
        riskRating,
        impact,
        likelihood,
        reportedDate,
        status,
        KpiKri 
    })

    newRisk.save().then(()=>{
        res.json("Risk Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//get all risks
router.route("/").get((req,res)=>{
    Risk.find().then((risks)=>{
        res.json(risks);
    }).catch((err)=>{
        console.log(err);
    })
})

//update a risk by id
router.route("/update/:id").put(async(req,res)=>{
    let riskId = req.params.id;
    //destucture method
    const {riskCode,project,specificRisk,riskRating,impact,likelihood,reportedDate,status,KpiKri} = req.body;

    const updateStudent = {
        riskCode,
        project,
        specificRisk,
        riskRating,
        impact,
        likelihood,
        reportedDate,
        status,
        KpiKri 
    }

    const update  = await Risk.findByIdAndUpdate(riskId,updateRisk).then(()=>{
        res.status(200).send({status : "Risk updated" });
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status : "Error with updating data",error : err.message});
    })
})

//delete a risk
router.route("/delete/:id").delete(async(req,res)=>{
    let riskId = req.params.id;
    await Risk.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status : "Risk deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with delete risk", error : err.message});
    })
})

//get one risk
router.route("/get/:id").get(async(req,res)=>{
    let riskId = req.params.id;
    const risk = Risk.findById(riskId).then((risks)=>{
        res.status(200).send({status : "Risk fetched", user : students});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with get risk", error : err.message});
    })
})



module.exports = router;