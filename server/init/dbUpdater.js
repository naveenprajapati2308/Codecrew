const mongoose = require('mongoose')
const Problem = require('../models/problem')
const User = require('../models/user')
const Submission = require('../models/submission')
require('dotenv').config({ path: '../.env' });


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("database connected");
}

async function updateProblem() {
    await Problem.updateMany({}, {
        $set: {
            // acceptedSubmissions: 0,
            // rejectedSubmissions: 0,
            // dislikes : [],
            // likes : [],
            // acceptanceRate : 100,
            // author : "Faraz Khan",
            authorId : "661c30e427b00f556e4e1362"
        }
    })

    console.log("YUSSS");
}

async function updateUser() {
    await User.updateMany({}, {
        $set: {
            // likedProblems: [],
            // dislikedProblems: [],
            // submissions : [],
            // saved : [],
            // image :{
            //     url : "https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png",
            //     public_id : null,
            // }
        }
    })

    console.log("YUSSS");
}
async function updateProblemSubmission() {
    const problems = await Problem.find();

    for (let i = 0; i < problems.length; i++) {
        const problem = problems[i];

        id = problem._id
        // console.log(id);
        const countAccept = await Submission.countDocuments({$and :[{ problemId : (id)} , {status : "Accepted"}]})
        const countReject = await Submission.countDocuments({$and :[{ problemId : id} , {status : "Rejected"}]})
        // console.log(submissions);
        // submissions.map(submission => console.log(submission.status))
        console.log(countAccept);
        console.log(countReject);

        await Problem.findByIdAndUpdate(id , {$set : {
            acceptedSubmissions : countAccept ,
            rejectedSubmissions : countReject ,
        }})

        
    }

    // console.log("YUSSS");
}

async function updateTimeStamps() {
    try {
        const currentDate = new Date();

        // Find all documents
        const problems = await Problem.find();

        // Iterate through each document
        for (const problem of problems) {
            const updatedProblem = {
                ...problem.toObject(), // Convert Mongoose document to plain JavaScript object
                updatedAt: currentDate, // Set updatedAt to current date
            };

            // Set createdAt if it doesn't exist
            if (!problem.createdAt) {
                updatedProblem.createdAt = currentDate;
            }

            // Replace the document with the updated one
            await Problem.replaceOne({ _id: problem._id }, updatedProblem);
        }
        console.log('Timestamps added to existing documents.');
        // mongoose.connection.close();
    } catch (error) {
        console.error('Error updating documents:', error);
        // mongoose.connection.close();
    }
}

async function updateUserTimeStamps() {
    try {
        const users = await User.find();
        

        for (const user of users) {
            
            const userObject = user.toObject();

            
            if (!userObject.createdAt) {
                userObject.createdAt = user._id.getTimestamp();
            }
            
            
            userObject.updatedAt = new Date();

            
            await User.replaceOne({ _id: user._id }, userObject);
        }

        console.log("Timestamps updated for all users.");
    } catch (error) {
        console.error("Error updating user timestamps:", error);
    }
}

async function addSubmissionsToUser() {
    
    const users = await User.find({} , {_id : 1})

    for({_id} of users){
        
        const submissions = await Submission.find({userId : _id} , {_id :1})
        // console.log(submissions);

        await User.findByIdAndUpdate(_id , {$set : {
            submissions : submissions,
        }});
        

        // console.log("****************************************************************************************");
    }

    console.log("Done");
}

//set will reset the given values
updateProblem()
// updateUser()
// updateProblemSubmission()
// updateTimeStamps()
// updateUserTimeStamps()
// addSubmissionsToUser()

