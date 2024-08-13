const express = require('express')
const Submission = require('../models/submission')
const router = express.Router()

router.get('/submissions' , async(req , res)=>{
    try {
        const submissions = await Submission.find().sort({createdAt:-1}).populate('userId' , 'image')
        res.json(submissions)
    } catch (error) {
        res.json(error)
    }
})
router.get('/submission/:id' , async(req , res)=>{
    try {
        const {id} = req.params;
        // console.log("req received for a submission" , id);
        const submissionDoc = await Submission.findById(id).populate('userId' , 'image')
        res.status(200).json(submissionDoc)
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports = router