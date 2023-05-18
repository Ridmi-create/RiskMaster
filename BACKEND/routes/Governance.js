const router = require("express").Router();
let Governance = require("../models/Governance");

//add new governance
router.route("/add").post((req,res)=>{
    const governanceID = req.body.governanceID;
    const governanceName = req.body.governanceName;
    const governancePwd = req.body.governancePwd;
    const governanceDesignation = req.body.governanceDesignation;
    const governanceMail = req.body.governanceMail;
    const governancePhone = req.body.governancePhone;

    const newGovernance = new Governance({
        governanceID,
        governanceName,
        governancePwd,
        governanceDesignation,
        governanceMail,
        governancePhone
    })

    newGovernance.save().then(()=>{
        res.json("Governance Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//get all governances
router.route("/").get((req,res)=>{
    Governance.find().then((governances)=>{
        res.json(governances);
    }).catch((err)=>{
        console.log(err);
    })
})

//update a governance by id
router.route("/update/:id").put(async(req,res)=>{
    let governanceId = req.params.id;
    //destucture method
    const {governanceID,governanceName,governancePwd,governanceDesignation,governanceMail,governancePhone} = req.body;

    const updateGovernance = {
        governanceID,
        governanceName,
        governancePwd,
        governanceDesignation,
        governanceMail,
        governancePhone
    }

    const update  = await Governance.findByIdAndUpdate(governanceId,updateGovernance).then(()=>{
        res.status(200).send({status : "Governance updated" });
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status : "Error with updating data",error : err.message});
    })
})

//delete a governance
router.route("/delete/:id").delete(async(req,res)=>{
    let governanceId = req.params.id;
    await Governance.findByIdAndDelete(governanceId).then(()=>{
        res.status(200).send({status : "Governance deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with delete governance", error : err.message});
    })
})

//get one governance
router.route("/get/:id").get(async(req,res)=>{
    let governanceId = req.params.id;
    const governance = Governance.findById(governanceId).then((governances)=>{
        res.status(200).send({status : "Governance fetched", governance : governances});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with get governance", error : err.message});
    })
})



module.exports = router;