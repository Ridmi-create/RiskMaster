const router = require("express").Router();
let Action = require("../models/Action");

//add new action
router.route("/add").post((req,res)=>{
    const actionID = req.body.actionID;
    const actionPlan = req.body.actionPlan;
    const actionPlanOwner = req.body.actionPlanOwner;
    const estimatedEndDate = req.body.estimatedEndDate;
    const actionStatus = req.body.actionStatus;

    const newAction = new Action({
        actionID,
        actionPlan,
        actionPlanOwner,
        estimatedEndDate,
        actionStatus
    })

    newAction.save().then(()=>{
        res.json("Action Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//get all actions
router.route("/").get((req,res)=>{
    Action.find().then((actions)=>{
        res.json(actions);
    }).catch((err)=>{
        console.log(err);
    })
})

//update an action by id
router.route("/update/:id").put(async(req,res)=>{
    let actionId = req.params.id;
    //destucture method
    const {actionID,actionPlan,actionPlanOwner,estimatedEndDate,actionStatus} = req.body;

    const updateAction = {
        actionID,
        actionPlan,
        actionPlanOwner,
        estimatedEndDate,
        actionStatus
    }

    const update  = await Action.findByIdAndUpdate(actionId,updateAction).then(()=>{
        res.status(200).send({status : "Action updated" });
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status : "Error with updating data",error : err.message});
    })
})

//delete a action
router.route("/delete/:id").delete(async(req,res)=>{
    let actionId = req.params.id;
    await Action.findByIdAndDelete(actionId).then(()=>{
        res.status(200).send({status : "Action deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with delete action", error : err.message});
    })
})

//get one action
router.route("/get/:id").get(async(req,res)=>{
    let actionId = req.params.id;
    const action = Action.findById(actionId).then((actions)=>{
        res.status(200).send({status : "Action fetched", action : actions});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with get action", error : err.message});
    })
})



module.exports = router;