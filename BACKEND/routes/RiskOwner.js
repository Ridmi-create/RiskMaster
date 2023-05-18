const router = require("express").Router();
let RiskOwner = require("../models/RiskOwner");

//add new riskowner
router.route("/add").post((req,res)=>{
    const riskOwnerID = req.body.riskOwnerID;
    const riskOwnerName = req.body.riskOwnerName;
    const riskOwnerPwd = req.body.riskOwnerPwd;
    const riskOwnerDesignation = req.body.riskOwnerDesignation;
    const riskOwnerMail = req.body.riskOwnerMail;
    const riskOwnerPhone = req.body.riskOwnerPhone;

    const newRiskOwner = new RiskOwner({
        riskOwnerID,
        riskOwnerName,
        riskOwnerPwd,
        riskOwnerDesignation,
        riskOwnerMail,
        riskOwnerPhone
    })

    newRiskOwner.save().then(()=>{
        res.json("RiskOwner Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//get all riskowners
router.route("/").get((req,res)=>{
    RiskOwner.find().then((riskOwners)=>{
        res.json(riskOwners);
    }).catch((err)=>{
        console.log(err);
    })
})

//update a riskowner by id
router.route("/update/:id").put(async(req,res)=>{
    let riskOwnerId = req.params.id;
    //destucture method
    const {riskOwnerID,riskOwnerName,riskOwnerPwd,riskOwnerDesignation,riskOwnerMail,riskOwnerPhone} = req.body;

    const updateRiskOwner = {
        riskOwnerID,
        riskOwnerName,
        riskOwnerPwd,
        riskOwnerDesignation,
        riskOwnerMail,
        riskOwnerPhone
    }

    const update  = await RiskOwner.findByIdAndUpdate(riskOwnerId,updateRiskOwner).then(()=>{
        res.status(200).send({status : "RiskOwner updated" });
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status : "Error with updating data",error : err.message});
    })
})

//delete a riskowner
router.route("/delete/:id").delete(async(req,res)=>{
    let riskOwnerId = req.params.id;
    await RiskOwner.findByIdAndDelete(riskOwnerId).then(()=>{
        res.status(200).send({status : "RiskOwner deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with delete RiskOwner", error : err.message});
    })
})

//get one riskowner
router.route("/get/:id").get(async(req,res)=>{
    let riskOwnerId = req.params.id;
    const riskOwner = RiskOwner.findById(riskOwnerId).then((riskOwners)=>{
        res.status(200).send({status : "RiskOwner fetched", riskOwner : riskOwners});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with get riskOwner", error : err.message});
    })
})



module.exports = router;