const Queue = require("bull");
const Job = require("../models/job");

const path = require('path')
const fs = require('fs')

const { generateFile, extension, executeCpp, compileCpp } = require('../utils/methods');
const { executePython } = require('../utils/pythonExecutor')
const { compileJava, executeJava } = require('../utils/javaExecutor');
const Problem = require("../models/problem");
const Submission = require("../models/submission");
const User = require("../models/user");
const {judgeOutput} = require('../utils/comparator')




const jobQueue = new Queue("submission-queue");
const NUM_WORKERS = 2;

jobQueue.process(NUM_WORKERS, async ({ data }) => {

    const Jobid = data.id;
    const jobDoc = await Job.findById(Jobid);
    const problemDoc = await Problem.findById(jobDoc.problemId)
    const userDoc = await User.findById(jobDoc.userId)

    jobDoc.status = "compiling"
    await jobDoc.save()


    const submission = new Submission({
        user : userDoc.username,
        language : jobDoc.language,
        code : jobDoc.code,
        problemId : problemDoc._id,
        userId : userDoc._id,
        email : userDoc.email,
        problemName : problemDoc.name,
    })

    let startTime = 0;
    let endTime = 0;


    try {
        const { language, filePath } = jobDoc;
        let output;
        
        const CorrectOutput = problemDoc.output
        const input = problemDoc.input

        if (language == "cpp" || language == "c") {
            const jobId = await compileCpp(filePath)
            jobDoc.status = "running-tests"
            await jobDoc.save()
            startTime = Date.now()
            output = await executeCpp(jobId, input)
            endTime = Date.now()
        }
        else if (language == "python") {
            jobDoc.status = "running-tests"
            await jobDoc.save()
            startTime = Date.now()
            output = await executePython(filePath, input)
            endTime = Date.now()
        }
        else if (language == "java") {
            const filename = await compileJava(filePath)
            jobDoc.status = "running-tests"
            await jobDoc.save()
            startTime = Date.now()
            output = await executeJava(filename, input)
            endTime = Date.now()
        }
        submission.runtime = (endTime - startTime);
        // console.log("completed");
        output = output.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        output = output.trim()


        if (output.trim() == CorrectOutput.trim()) {
            submission.status = "Accepted"
            submission.message = "Correct Output"
            const submissionDoc = await submission.save()
            // res.json({ verdict: true, output, CorrectOutput, submissionDoc })

            await User.findByIdAndUpdate(userDoc._id, { $addToSet: { solved: problemDoc._id } })
            await User.findByIdAndUpdate(userDoc._id, { $push: { submissions: submissionDoc._id } })
            problemDoc.acceptedSubmissions++;
            problemDoc.save();



        }
        else {

            const judgement = judgeOutput(CorrectOutput, output, input)

            submission.status = "Rejected"
            submission.message = "Wrong Answer"
            submission.FailedInfo = judgement
            const submissionDoc = await submission.save()


            // console.log(judgement);
            // console.log(CorrectOutput.split('\n') , output.split('\n') , input.split('\n'));

            // res.json({ verdict: false, output, CorrectOutput, submissionDoc, judgement })

            await User.findByIdAndUpdate(userDoc._id, { $push: { submissions: submissionDoc._id } })
            problemDoc.rejectedSubmissions++;
            problemDoc.save();

        }

    } catch (error) {
        // console.log(error);

        submission.status = "Rejected"
        submission.message = "Compilation Error"
        submission.errorMessage = error.message;

        

        const submissionDoc = await submission.save()
        
        // error.submissionDoc = submissionDoc
        // console.log(error.message);
        // res.status(error.statusCode ? error.statusCode : 500).json(error)
        await User.findByIdAndUpdate(userDoc._id, { $push: { submissions: submissionDoc._id } })
        // const problem = await Problem.findById(id);
        problemDoc.rejectedSubmissions++;
        problemDoc.save()
    }
    finally{
        jobDoc.status = "completed";
        jobDoc.submissionId = submission._id;
        // console.log("This happened");
        await jobDoc.save()
        return true;
    }

});

jobQueue.on("failed", (error) => {
    console.error(error.data.id, error.failedReason);
});

const addToSubmissionQueue = async (jobId) => {
    jobQueue.add({
        id: jobId,
    });
};

module.exports = {
    addToSubmissionQueue,
};