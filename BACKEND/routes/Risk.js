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
    const actionPlan = req.body.actionPlan;
    const estimatedEndDate = req.body.estimatedEndDate;
    const riskOwnerID = req.body.riskOwnerID;
    const departmentCode = req.body.departmentCode;
    

    const newRisk = new Risk({
        riskCode,
        project,
        specificRisk,
        riskRating,
        impact,
        likelihood,
        reportedDate,
        status,
        KpiKri,
        actionPlan,
        estimatedEndDate,
        riskOwnerID,
        departmentCode
       
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
    const {riskCode,project,specificRisk,riskRating,impact,likelihood,reportedDate,status,KpiKri,actionPlan,estimatedEndDate, riskOwnerID, departmentCode} = req.body;

    const updateRisk = {
        riskCode,
        project,
        specificRisk,
        riskRating,
        impact,
        likelihood,
        reportedDate,
        status,
        KpiKri,
        actionPlan,
        estimatedEndDate,
        riskOwnerID,
        departmentCode
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
    await Risk.findByIdAndDelete(riskId).then(()=>{
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
        res.status(200).send({status : "Risk fetched", risk : risks});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with get risk", error : err.message});
    })
})

//get risk by department
router.route("/getD/:departmentCode").get(async (req, res) => {
    try {
      let departmentCode = req.params.departmentCode;
      console.log(departmentCode);
      const query = { departmentCode: departmentCode };
      const docs = await Risk.find(query).exec();
  
      console.log('Fetched records:');
      console.log(docs);
  
      // Send the fetched records as the API response
      res.json(docs);
    } catch (err) {
      console.error('Failed to fetch records:', err);
      res.status(500).json({ error: 'Failed to fetch records' });
    }
  });

  //get risk by riskOwnerID
router.route("/getR/:riskOwnerID").get(async (req, res) => {
    try {
      console.log("came to getR")
      let riskOwnerID = req.params.riskOwnerID;
      
      const query = { riskOwnerID: riskOwnerID};
      const docs = await Risk.find(query).exec();
  
      console.log('Fetched records:');
      console.log(docs);
  
      // Send the fetched records as the API response
      res.json(docs);
    } catch (err) {
      console.error('Failed to fetch records:', err);
      res.status(500).json({ error: 'Failed to fetch records' });
    }
  });
  
  //get last record
const getLastAddedRiskCode = async () => {
    try {
      const lastAddedRecord = await Risk.findOne({}, { riskCode: 1 }).sort({ _id: -1 });
      if (lastAddedRecord) {
        const lastAddedRiskCode = lastAddedRecord.riskCode;
        const numericPart = parseInt(lastAddedRiskCode.substring(2));
        const newNumericPart = numericPart + 1;
        const newId = `RC${String(newNumericPart).padStart(3, '0')}`;
        return newId;
      }
      return 'No records found.';
    } catch (error) {
      throw new Error('Error fetching last added riskOwnerID:', error);
    }
  };
  
  router.route('/getId').get(async (req,res) => {
    try {
      const lastAddedRiskCode = await getLastAddedRiskCode();
      res.json(lastAddedRiskCode);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  



module.exports = router;