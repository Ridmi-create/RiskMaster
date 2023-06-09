const router = require("express").Router();
let RiskOwner = require("../models/RiskOwner");
const multer = require('multer');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Customize the filename as per your requirements
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

//add new riskowner
router.route("/add").post((req, res) => {
    const riskOwnerID = req.body.riskOwnerID;
    const riskOwnerName = req.body.riskOwnerName;
    const riskOwnerPwd = req.body.riskOwnerPwd;
    const riskOwnerDesignation = req.body.riskOwnerDesignation;
    const riskOwnerMail = req.body.riskOwnerMail;
    const riskOwnerPhone = req.body.riskOwnerPhone;
    const departmentCode = req.body.departmentCode;

    const newRiskOwner = new RiskOwner({
        riskOwnerID,
        riskOwnerName,
        riskOwnerPwd,
        riskOwnerDesignation,
        riskOwnerMail,
        riskOwnerPhone,
        departmentCode
    })

    newRiskOwner.save().then(() => {
        res.json("RiskOwner Added Successfully")
    }).catch((err) => {
        console.log(err);
    })
})

//upload the profile picture
router.post('/upload-profile-picture', upload.single('riskOwnerPic'), async (req, res) => {
    // Get the user ID associated with the profile picture
    const userId = req.body.userId;
    // Update the user model with the image file reference
    await User.findByIdAndUpdate(userId, { profilePicture: imageFile }).then(() => {
        res.status(200).json({ message: 'Profile picture uploaded successfully' })
    }).catch((err) => {
        res.status(500).json({ message: 'Something went wrong! Try again' })
    })
});

//get all riskowners
router.route("/").get((req, res) => {
    RiskOwner.find().then((riskOwners) => {
        res.json(riskOwners);
    }).catch((err) => {
        console.log(err);
    })
})

//update a riskowner by id
router.route("/update/:riskOwnerID").put(async (req, res) => {
    let riskOwnerId = req.params.riskOwnerID;
    //destucture method
    const riskOwnerID = req.body.riskOwnerID;
    const riskOwnerName = req.body.riskOwnerName;
    const riskOwnerPwd = req.body.riskOwnerPwd;
    const riskOwnerDesignation = req.body.riskOwnerDesignation;
    const riskOwnerMail = req.body.riskOwnerMail;
    const riskOwnerPhone = req.body.riskOwnerPhone;
    const departmentCode = req.body.departmentCode;

    const updateRiskOwner = {
        riskOwnerID,
        riskOwnerName,
        riskOwnerPwd,
        riskOwnerDesignation,
        riskOwnerMail,
        riskOwnerPhone,
        departmentCode
    }

    const updatedRiskOwner = await RiskOwner.findOneAndUpdate(
      { riskOwnerID }, // Filter by name
      updateRiskOwner, // Updated data
      { new: true } // Return the modified document
    );
    
    if (!updatedRiskOwner) {
      return res.status(404).json({ error: 'RiskOwner not found' });
    }
    
    res.status(200).json({ status: 'RiskOwner updated', riskOwner: updatedRiskOwner });
})

//delete a riskowner
/*router.route("/delete/:riskOwnerID").delete(async (req, res) => {
    let riskOwnerId = req.params.riskOwnerID;
    await RiskOwner.findOneAndDelete(riskOwnerId).then(() => {
        res.status(200).send({ status: "RiskOwner deleted" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with delete RiskOwner", error: err.message });
    })
})*/

//get one riskowner
router.route("/get/:riskOwnerId").get(async (req, res) => {
    let riskOwnerId = req.params.id;
    const riskOwner = RiskOwner.findOne(riskOwnerId).then((riskOwners) => {
        res.status(200).send({ status: "RiskOwner fetched", riskOwner: riskOwners });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with get riskOwner", error: err.message });
    })
})

//get last record
const getLastAddedRiskOwnerID = async () => {
    try {
      const lastAddedRecord = await RiskOwner.findOne({}, { riskOwnerID: 1 }).sort({ _id: -1 });
      if (lastAddedRecord) {
        const lastAddedRiskOwnerID = lastAddedRecord.riskOwnerID;
        const numericPart = parseInt(lastAddedRiskOwnerID.substring(1));
        const newNumericPart = numericPart + 1;
        const newId = `R${String(newNumericPart).padStart(3, '0')}`;
        return newId;
      }
      return 'No records found.';
    } catch (error) {
      throw new Error('Error fetching last added riskOwnerID:', error);
    }
  };
  
  router.route('/getId').get(async (req,res) => {
    try {
      const lastAddedRiskOwnerID = await getLastAddedRiskOwnerID();
      res.json(lastAddedRiskOwnerID);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Login route
router.post("/login", async (req, res) => {
    const { riskOwnerID, riskOwnerPwd } = req.body;
    console.log("Came")
    console.log(riskOwnerID);
  
    try {
      // Find the user with the provided email in the database
      const riskOwner = await RiskOwner.findOne({ riskOwnerID });
  
      // Check if the user exists
      if (!riskOwner) {
        return res.status(404).json({ message: 'User not found' });
      }
      else{
        console.log("user found");
      }
  
      // Compare the provided password with the hashed password in the database
      if (!(riskOwner.riskOwnerPwd===riskOwnerPwd)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      else{
        console.log("Password Match");
      }
  
      // If passwords match, generate a JSON Web Token (JWT)
      const token = jwt.sign({ riskOwnerID: riskOwner._id }, 'your-secret-key', { expiresIn: '1h' });
      //res.status(200).send({status : "Admin logged" });
  
      // Return the token to the client
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  //get risk owner name
  router.route("/name/:riskOwnerID").get(async (req, res) => {
    try {
      
      console.log("Came name")
      let riskOwnerID = req.params.riskOwnerID;
      
      const query = {riskOwnerID: riskOwnerID};
      const riskOwner = await RiskOwner.findOne(query);
      res.json(riskOwner);

    } catch (err) {
      console.error('Failed', err);
      res.status(500).json({ error: 'Failed' });
    }
  });

module.exports = router;