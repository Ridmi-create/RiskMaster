const router = require("express").Router();
let RGS = require("../models/RGS");

//add new rgs
router.route("/add").post((req,res)=>{
    console.log("came to add rgs")
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
router.route("/update/:rgsID").put(async(req,res)=>{
    
    let rgsId = req.params.rgsID;
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
router.route("/get/:rgsID").get(async(req,res)=>{
    console.log("Came get rgsID")
    let rgsId = req.params.rgsID;
    const query = {rgsID: rgsId};
    const riskOwner = await RGS.findOne(query);
      res.json(riskOwner);
})

//get last record
const getLastAddedRGSID = async () => {
    try {
      const lastAddedRecord = await RGS.findOne({}, { rgsID: 1 }).sort({ _id: -1 });
      if (lastAddedRecord) {
        const lastAddedRGSID = lastAddedRecord.rgsID;
        const numericPart = parseInt(lastAddedRGSID.substring(1));
        const newNumericPart = numericPart + 1;
        const newId = `S${String(newNumericPart).padStart(3, '0')}`;
        return newId;
      }
      return 'No records found.';
    } catch (error) {
      throw new Error('Error fetching last added riskOwnerID:', error);
    }
  };
  
  router.route('/getId').get(async (req,res) => {
    try {
      const lastAddedRGSID = await getLastAddedRGSID();
      res.json(lastAddedRGSID);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;