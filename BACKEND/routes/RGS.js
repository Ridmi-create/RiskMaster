const router = require("express").Router();
let RGS = require("../models/RGS");

//add new rgs
router.route("/add").post((req,res)=>{
    const rgsID = req.body.rgsID;
    const idnRisk = req.body.idnRisk;
    const idnImpLike = req.body.idnImpLike;
    const idnKpiKri = req.body.idnKpiKri;
    const mitigationTimeline = req.body.mitigationTimeline;
    const rgsDate = req.body.rgsDate;
    const rgsValue = req.body.rgsValue;
    const remarks = req.body.remarks;
    const departmentCode = req.body.departmentCode;

    const newRGS = new RGS({
        rgsID,
        idnRisk,
        idnImpLike,
        idnKpiKri,
        mitigationTimeline,
        rgsDate,
        rgsValue,
        remarks,
        departmentCode
    })

    newRGS.save().then(()=>{
        res.json("RGS Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//get all rgs
router.route("/").get((req,res)=>{
    RGS.find().then((RGSs)=>{
        res.json(RGSs);
    }).catch((err)=>{
        console.log(err);
    })
})

//update a rgs by id
router.route("/update/:id").put(async(req,res)=>{
    let rgsId = req.params.id;
    //destucture method
    const {rgsID,idnRisk,idnImpLike,idnKpiKri,mitigationTimeline,rgsDate,rgsValue,remarks, departmentCode} = req.body;

    const updateRGS = {
        rgsID,
        idnRisk,
        idnImpLike,
        idnKpiKri,
        mitigationTimeline,
        rgsDate,
        rgsValue,
        remarks,
        departmentCode
    }

    const update  = await RGS.findByIdAndUpdate(rgsId,updateRGS).then(()=>{
        res.status(200).send({status : "RGS updated" });
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status : "Error with updating data",error : err.message});
    })
})

//delete a RGS
router.route("/delete/:id").delete(async(req,res)=>{
    let rgsId = req.params.id;
    await RGS.findByIdAndDelete(rgsId).then(()=>{
        res.status(200).send({status : "RGS deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with delete RGS", error : err.message});
    })
})

//get one rgs
router.route("/get/:id").get(async(req,res)=>{
    let rgsId = req.params.id;
    const RGS = RGS.findById(rgsId).then((RGSs)=>{
        res.status(200).send({status : "RGS fetched", RGS : RGSs});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with get RGS", error : err.message});
    })
})



module.exports = router;