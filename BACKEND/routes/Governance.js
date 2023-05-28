const router = require("express").Router();
let Governance = require("../models/Governance");
const jwt = require('jsonwebtoken');

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

// Login route
router.post("/login", async (req, res) => {
    const { governanceID, governancePwd } = req.body;
    console.log("Came")
    console.log(governanceID);
  
    try {
      // Find the user with the provided email in the database
      const governance = await Governance.findOne({ governanceID });
  
      // Check if the user exists
      if (!governance) {
        return res.status(404).json({ message: 'User not found' });
      }
      else{
        console.log("user found");
      }
  
      // Compare the provided password with the hashed password in the database
      if (!(governance.governancePwd===governancePwd)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      else{
        console.log("Password Match");
      }
  
      // If passwords match, generate a JSON Web Token (JWT)
      const token = jwt.sign({ governanceID: governance._id }, 'your-secret-key', { expiresIn: '1h' });
      //res.status(200).send({status : "Admin logged" });
  
      // Return the token to the client
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  //get last record
const getLastAddedGovernanceID = async () => {
    try {
      const lastAddedRecord = await Governance.findOne({}, { governanceID: 1 }).sort({ _id: -1 });
      if (lastAddedRecord) {
        const lastAddedGovernanceID = lastAddedRecord.governanceID;
        const numericPart = parseInt(lastAddedGovernanceID.substring(1));
        const newNumericPart = numericPart + 1;
        const newId = `G${String(newNumericPart).padStart(3, '0')}`;
        return newId;
      }
      return 'No records found.';
    } catch (error) {
      throw new Error('Error fetching last added riskOwnerID:', error);
    }
  };
  
  router.route('/getId').get(async (req,res) => {
    try {
      const lastAddedGovernanceID = await getLastAddedGovernanceID();
      res.json(lastAddedGovernanceID);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;