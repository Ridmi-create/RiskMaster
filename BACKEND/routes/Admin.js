const router = require("express").Router();
let Admin = require("../models/Admin");

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



module.exports = router;