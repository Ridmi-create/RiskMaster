const router = require("express").Router();
let Department = require("../models/Department");

//add new department
router.route("/add").post((req,res)=>{
    const departmentCode = req.body.departmentCode;
    const departmentName = req.body.departmentName;

    const newDepartment = new Department({
        departmentCode,
        departmentName
    })

    newDepartment.save().then(()=>{
        res.json("Department Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//get all departments
router.route("/").get((req,res)=>{
    Department.find().then((departments)=>{
        res.json(departments);
    }).catch((err)=>{
        console.log(err);
    })
})

//update an department by id
router.route("/update/:id").put(async(req,res)=>{
    let departmentId = req.params.id;
    //destucture method
    const {departmentCode,departmentName} = req.body;

    const updateDepartment = {
        departmentCode,
        departmentName
    }

    const update  = await Department.findByIdAndUpdate(departmentId,updateDepartment).then(()=>{
        res.status(200).send({status : "Department updated" });
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status : "Error with updating data",error : err.message});
    })
})

//delete a department
router.route("/delete/:id").delete(async(req,res)=>{
    let departmentId = req.params.id;
    await Department.findByIdAndDelete(departmentId).then(()=>{
        res.status(200).send({status : "Department deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with delete department", error : err.message});
    })
})

//get one department
router.route("/get/:id").get(async(req,res)=>{
    let departmentId = req.params.id;
    const department = Department.findById(departmentId).then((departments)=>{
        res.status(200).send({status : "Department fetched", department : departments});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with get department", error : err.message});
    })
})



module.exports = router;