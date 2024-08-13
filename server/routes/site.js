const Problem = require('../models/problem')
const User = require('../models/user')
const Submission = require('../models/submission')
const ExpressError = require('../utils/ExpressError')
const express = require('express')
const Job = require('../models/job')

const router = express.Router()

router.get('/site/info', async (req, res) => {
    try {

        let AllProblems = await Problem.find().select('difficulty')
        let AllUsers = await User.find().select('createdAt')
        let AllSubmissions = await Submission.find().select('createdAt language status')
        let jobsCount = await Job.countDocuments()

        let problems = {
            total: AllProblems.length,
            basic: AllProblems.filter(p => p.difficulty == "basic").length,
            easy: AllProblems.filter(p => p.difficulty == "easy").length,
            medium: AllProblems.filter(p => p.difficulty == "medium").length,
            hard: AllProblems.filter(p => p.difficulty == "hard").length,
        }
        let userInfo = {
            count: AllUsers.length,
            users: AllUsers.map(u => u.createdAt),
        }
        let submissionInfo = {
            total: AllSubmissions.length,
            accepted: AllSubmissions.filter(s => s.status == "Accepted").length,
            rejected: AllSubmissions.filter(s => s.status == "Rejected").length,
            dates: AllSubmissions.map(s => s.createdAt)
        }

        res.status(200).send({ problems, userInfo, submissionInfo , jobsCount })

    } catch (error) {
        res.send(500).send(error)
    }
})


router.get('/site/leaderboard', async (req, res , next) => {

    const points = {
        'basic': 10,
        'easy': 30,
        'medium': 80,
        'hard': 150
    }
    

    try {
        const users = await User.find().populate('solved', 'difficulty').select('username createdAt image submissions');
    

        const processedUsers = users.map(user => {
            let count = 0;
            for (const problem of user.solved) {
              count += points[problem.difficulty];
            }
        
            // Convert Mongoose document to plain object and add points field
            const userObject = user.toObject();
            userObject.points = count;
            userObject.solvedCount = userObject.solved.length;
            userObject.submissionCount = userObject.submissions.length;
        
            // Remove the solved field
            delete userObject.solved;
            delete userObject.submissions;
        
            return userObject;
          });
        // Sort the processed users by points in descending order
        processedUsers.sort((a, b) => b.points - a.points);
        res.json(processedUsers);

    } catch (error) {
        next(error)
    }
})

module.exports = router 
