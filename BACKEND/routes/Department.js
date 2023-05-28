const router = require("express").Router();
let Department = require("../models/Department");

//add new department
router.route("/add").post((req, res) => {
    const departmentCode = req.body.departmentCode;
    const departmentName = req.body.departmentName;

    const newDepartment = new Department({
        departmentCode,
        departmentName
    })

    newDepartment.save().then(() => {
        res.json("Department Added Successfully")
    }).catch((err) => {
        console.log(err);
    })
})

//get all departments
router.route("/").get((req, res) => {
    Department.find().then((departments) => {
        res.json(departments);
    }).catch((err) => {
        console.log(err);
    })
})

//update an department by id
router.route("/update/:id").put(async (req, res) => {
    let departmentId = req.params.id;
    //destucture method
    const { departmentCode, departmentName } = req.body;

    const updateDepartment = {
        departmentCode,
        departmentName
    }

    const update = await Department.findByIdAndUpdate(departmentId, updateDepartment).then(() => {
        res.status(200).send({ status: "Department updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })
})

//delete a department
router.route("/delete/:id").delete(async (req, res) => {
    let departmentId = req.params.id;
    await Department.findByIdAndDelete(departmentId).then(() => {
        res.status(200).send({ status: "Department deleted" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with delete department", error: err.message });
    })
})

//get one department
router.route("/get/:id").get(async (req, res) => {
    let departmentId = req.params.id;
    const department = Department.findById(departmentId).then((departments) => {
        res.status(200).send({ status: "Department fetched", department: departments });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with get department", error: err.message });
    })
});

// Define the route to get department names
router.get('/names', async (req, res) => {
    try {
        // Retrieve the department names from MongoDB
        const departments = await Department.find({}, 'departmentCode departmentName');

        // Extract the department names from the retrieved data
        const departmentNames = departments.map(department => ({
            departmentCode: department.departmentCode,
            departmentName: department.departmentName,
        }));
        console.log(departmentNames);
        // Send the department names as the response
        res.json(departmentNames);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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
const getLastAddedDepartmentCode = async () => {
    try {
      const lastAddedRecord = await Department.findOne({}, { departmentCode: 1 }).sort({ _id: -1 });
      if (lastAddedRecord) {
        const lastAddedDepartmentCode = lastAddedRecord.departmentCode;
        const numericPart = parseInt(lastAddedDepartmentCode.substring(1));
        const newNumericPart = numericPart + 1;
        const newId = `D${String(newNumericPart).padStart(3, '0')}`;
        return newId;
      }
      return 'No records found.';
    } catch (error) {
      throw new Error('Error fetching last added riskOwnerID:', error);
    }
  };
  
  router.route('/getId').get(async (req,res) => {
    try {
      const lastAddedDepartmentCode = await getLastAddedDepartmentCode();
      res.json(lastAddedDepartmentCode);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



module.exports = router;