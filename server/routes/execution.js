const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs')
const app = express();
require('dotenv').config()
const Problem = require('../models/problem')

const {generateFile , extension, OutputExtension , executeCpp , compileCpp} = require('../utils/methods');
const {executePython} = require('../utils/pythonExecutor')
const {compileJava , executeJava} = require('../utils/javaExecutor');
const Submission = require('../models/submission');
const User = require('../models/user')
const { isLoggedIn } = require('../middlewares/userMiddleware');
const {judgeOutput} = require('../utils/comparator')
const {addToRunQueue} = require('../execution-queue/runQueue')
const {addToSubmissionQueue} = require('../execution-queue/submissionQueue')
const Job = require('../models/job')

// router.post('/run' , async(req , res)=>{

//     try {

//         console.log("req received");
//         console.log("req at /api/run");

//         const {code , language , inputValue} = req.body.payload;
//         const filePath = await generateFile(code , extension[language])

//         let output;

//         if(language == "cpp" || language=="c"){
//             const jobId = await compileCpp(filePath)
//             output = await executeCpp(jobId , inputValue)
//         }
//         else if(language == "python"){
//             output = await executePython(filePath , inputValue)
//         }
//         else if(language == "java"){
//             const filename = await compileJava(filePath)
//             output = await executeJava(filename , inputValue)
//         }
//         res.json({code , output})        
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json(error)
//     }
// })
router.post('/run' , async(req , res)=>{

    try {

        console.log("req received run queue");
        console.log("req at /api/run");

        const {code , language , inputValue} = req.body.payload;
        const filePath = await generateFile(code , extension[language])

        let jobDoc = new Job({
            status : "queue",
            problemId : null,
            userId : null,
            filePath : filePath,
            inputValue : inputValue,
            language: language,
            code: code,  
            runResult : {
                output : null,
                failureType : null,
                isError : null,
            }
        })
        await jobDoc.save();
        addToRunQueue(jobDoc._id)
        res.status(201).json({msg : "added to queue" , jobDoc})        
   
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error)
    }
})

router.get('/run/status' , async(req , res)=>{
    try {
        const {id} = req.query;

        const jobDoc = await Job.findById(id);
        // console.log("status req");
        // console.log(id);

        res.json(jobDoc);

        // try {
        //     let Fullfilename = path.basename(jobDoc.filePath)
        //     let filename = Fullfilename.split('.')[0]
        //     let outputFile = filename + "." + OutputExtension[jobDoc.language]
            
        //     const ouptuFilePath = path.join(__dirname , '..' , "outputs" , outputFile )
        //     console.log(ouptuFilePath);

        //     if(jobDoc.status == "completed"){
        //         console.log(jobDoc.filePath);
        //         fs.unlink(jobDoc.filePath , (err)=>{
        //             if(err) throw err
        //             // console.log("file deleted code");
        //         });

        //         if(jobDoc.language != "py"){
        //             fs.unlink(ouptuFilePath , (err)=>{
        //                 if(err) throw err
        //                 // console.log("file deleted output");
        //             });
        //         }

        //     }
        // } catch (error) {
        //     console.log(error.message);
        // }
    
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/submit' , async(req , res)=>{

    try {

        console.log("req at /api/submit");

        const {code , language} = req.body.payload;
        const filePath = await generateFile(code , extension[language])

        let output;
        const input = fs.readFileSync('./testcases/input.txt', { encoding: 'utf8', flag: 'r' });
        const finalOutput = fs.readFileSync('./testcases/output.txt', { encoding: 'utf8', flag: 'r' });
        CorrectOutput = finalOutput.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        // CorrectOutput = finalOutput

        if(language == "cpp" || language == "c"){
            const jobId = await compileCpp(filePath)
            output = await executeCpp(jobId , input)
        }
        else if(language == "python"){
            output = await executePython(filePath , input)
        }
        else if(language == "java"){
            const filename = await compileJava(filePath)
            output = await executeJava(filename , input)
        }
        // console.log("completed");
        if(output.trim() == CorrectOutput.trim()){
            res.json({verdict : true , output , CorrectOutput})
        }
        else{
            res.json({verdict : false , output , CorrectOutput})
        }
    } catch (error) {
        console.log(error);
        res.status(error.statusCode && 500).json(error)
    }
})

// router.post('/submit/:id' , isLoggedIn ,async(req , res)=>{
//     const {code , language} = req.body.payload;
//     const {id} = req.params;

//     const submission = new Submission({
//         user : req.user.username,
//         language,
//         code,
//         problemId : id,
//         userId : req.user._id,
//         email : req.user.email,
//     })
//     try {
        
//         console.log("req at /api/submit/:id");  

        
//         const filePath = await generateFile(code , extension[language])

//         let output;
//         const problemDoc = await Problem.findById(id)
//         const CorrectOutput = problemDoc.output
//         const input = problemDoc.input

//         submission.problemName = problemDoc.name;

//         if(language == "cpp" || language == "c"){
//             const jobId = await compileCpp(filePath)
//             output = await executeCpp(jobId , input)
//         }
//         else if(language == "python"){
//             output = await executePython(filePath , input)
//         }
//         else if(language == "java"){
//             const filename = await compileJava(filePath)
//             output = await executeJava(filename , input)
//         }
//         console.log("completed");
//         output = output.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
//         output = output.trim()


//         if(output.trim() == CorrectOutput.trim()){
//             submission.status = "Accepted"
//             submission.message = "Correct Output"
//             const submissionDoc = await submission.save()
//             res.json({verdict : true , output , CorrectOutput , submissionDoc})
//             await User.findByIdAndUpdate(req.user._id, { $addToSet: { solved: id }})
//             await User.findByIdAndUpdate(req.user._id, { $push : { submissions : submissionDoc._id } })
//             problemDoc.acceptedSubmissions++;
//             problemDoc.save();



//         }
//         else{

//             const judgement = judgeOutput(CorrectOutput, output ,input)

//             submission.status = "Rejected"
//             submission.message = "Wrong Answer"
//             submission.FailedInfo = judgement
//             const submissionDoc = await submission.save()

            
//             // console.log(judgement);
//             // console.log(CorrectOutput.split('\n') , output.split('\n') , input.split('\n'));

//             res.json({verdict : false , output , CorrectOutput , submissionDoc , judgement})
            
//             await User.findByIdAndUpdate(req.user._id, { $push : { submissions : submissionDoc._id } })
//             problemDoc.rejectedSubmissions++;
//             problemDoc.save();

//         }
//     } catch (error) {
//         console.log(error);
        
//         submission.status = "Rejected"
//         submission.message = "Compilation Error"
//         const submissionDoc = await submission.save()
//         error.submissionDoc = submissionDoc

//         res.status(error.statusCode ? error.statusCode : 500).json(error)
//         await User.findByIdAndUpdate(req.user._id, { $push : { submissions : submissionDoc._id } })
//         const problem = await Problem.findById(id);
//         problem.rejectedSubmissions++;
//         problem.save()

//     }
// })
router.post('/submit/:id' , isLoggedIn ,async(req , res)=>{

    try {
        console.log("req at /api/submit/:id");  

        const {code , language} = req.body.payload;
        const {id} = req.params;
        const filePath = await generateFile(code , extension[language])

        let jobDoc = new Job({
            status : "queue",
            problemId : id,
            userId : req.user._id,
            filePath : filePath,
            inputValue : null,
            language: language,
            code: code,  
            runResult : null,

        })
        await jobDoc.save();
        addToSubmissionQueue(jobDoc._id)
        res.status(201).json({msg : "added to queue" , jobDoc})  
    } catch (error) {

        res.status(500).json(error)
    }
})

router.get('/submit/status' , async(req , res)=>{

    try {
        const {id} = req.query;
        // console.log('/submit/status');

        const jobDoc = await Job.findById(id);
    
        if(jobDoc.status == "completed"){
            const submissionDoc = await Submission.findById(jobDoc.submissionId).populate('userId' , 'image')
            res.json({submissionDoc , jobDoc})            

            // fs.unlink(jobDoc.filePath);
            // console.log(jobDoc.filePath);
        }
        else{
            res.json({jobDoc});
        }        
    } catch (error) {
        res.status(500).json(error);
    }
    
})

module.exports = router 