const router = require("express").Router();
let Admin = require("../models/Admin");
const jwt = require('jsonwebtoken');
//add new admin
router.route("/add").post((req,res)=>{
    const adminID = req.body.adminID;
    const adminName = req.body.adminName;
    const adminPwd = req.body.adminPwd;

    const newAdmin = new Admin({
        adminID,
        adminName,
        adminPwd
    })

    newAdmin.save().then(()=>{
        res.json("Admin Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//get all admins
router.route("/").get((req,res)=>{
    Admin.find().then((admins)=>{
        res.json(admins);
    }).catch((err)=>{
        console.log(err);
    })
})

//update an admin by id
router.route("/update/:id").put(async(req,res)=>{
    let adminId = req.params.id;
    //destucture method
    const {adminID,adminName,adminPwd} = req.body;

    const updateGovernance = {
        adminID,
        adminName,
        adminPwd
    }

    const update  = await Admin.findByIdAndUpdate(adminId,updateAdmin).then(()=>{
        res.status(200).send({status : "Admin updated" });
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status : "Error with updating data",error : err.message});
    })
})

//delete a admin
router.route("/delete/:id").delete(async(req,res)=>{
    let adminId = req.params.id;
    await Admin.findByIdAndDelete(adminId).then(()=>{
        res.status(200).send({status : "Admin deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with delete admin", error : err.message});
    })
})

//get one admin
router.route("/get/:id").get(async(req,res)=>{
    let adminId = req.params.id;
    const admin = Admin.findById(adminId).then((admins)=>{
        res.status(200).send({status : "Admin fetched", admin : admins});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with get admin", error : err.message});
    })
})

//Admin Login
// Login route
router.post("/login", async (req, res) => {
    const { adminID, adminPwd } = req.body;
    console.log("Came")
    console.log(adminID);
  
    try {
      // Find the user with the provided email in the database
      const admin = await Admin.findOne({ adminID });
  
      // Check if the user exists
      if (!admin) {
        return res.status(404).json({ message: 'User not found' });
      }
      else{
        console.log("user found");
      }
  
      // Compare the provided password with the hashed password in the database
      //console.log(admin.adminPwd);
      //const isMatch = await bcrypt.compare(admin.adminPwd,adminPwd);
      //console.log(isMatch);
      // If passwords don't match, return an error
      if (!(admin.adminPwd===adminPwd)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      else{
        console.log("Password Match");
      }
  
      // If passwords match, generate a JSON Web Token (JWT)
      const token = jwt.sign({ adminID: admin._id }, 'your-secret-key', { expiresIn: '1h' });
      //res.status(200).send({status : "Admin logged" });
  
      // Return the token to the client
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });



module.exports = router;