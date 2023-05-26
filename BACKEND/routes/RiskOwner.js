const router = require("express").Router();
let RiskOwner = require("../models/RiskOwner");
const multer = require('multer');

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

    const newRiskOwner = new RiskOwner({
        riskOwnerID,
        riskOwnerName,
        riskOwnerPwd,
        riskOwnerDesignation,
        riskOwnerMail,
        riskOwnerPhone
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
router.route("/update/:id").put(async (req, res) => {
    let riskOwnerId = req.params.id;
    //destucture method
    const { riskOwnerID, riskOwnerName, riskOwnerPwd, riskOwnerDesignation, riskOwnerMail, riskOwnerPhone } = req.body;

    const updateRiskOwner = {
        riskOwnerID,
        riskOwnerName,
        riskOwnerPwd,
        riskOwnerDesignation,
        riskOwnerMail,
        riskOwnerPhone
    }

    const update = await RiskOwner.findByIdAndUpdate(riskOwnerId, updateRiskOwner).then(() => {
        res.status(200).send({ status: "RiskOwner updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })
})

//delete a riskowner
router.route("/delete/:id").delete(async (req, res) => {
    let riskOwnerId = req.params.id;
    await RiskOwner.findByIdAndDelete(riskOwnerId).then(() => {
        res.status(200).send({ status: "RiskOwner deleted" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with delete RiskOwner", error: err.message });
    })
})

//get one riskowner
router.route("/get/:id").get(async (req, res) => {
    let riskOwnerId = req.params.id;
    const riskOwner = RiskOwner.findById(riskOwnerId).then((riskOwners) => {
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
        return lastAddedRiskOwnerID;
      }
      return 'No records found.';
    } catch (error) {
      throw new Error('Error fetching last added riskOwnerID:', error);
    }
  };
  
  router.route('/getId').get(async (req, res) => {
    try {
      const lastAddedRiskOwnerID = await getLastAddedRiskOwnerID();
      res.json({ lastAddedRiskOwnerID });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;