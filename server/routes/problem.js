const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs')
const app = express();
require('dotenv').config()
const Problem = require('../models/problem')

const {generateFile , extension , executeCpp , compileCpp} = require('../utils/methods');
const {executePython} = require('../utils/pythonExecutor')
const {compileJava , executeJava} = require('../utils/javaExecutor');
const Submission = require('../models/submission');
const User = require('../models/user')
const { isLoggedIn , isAdmin } = require('../middlewares/userMiddleware');
const {judgeOutput} = require('../utils/comparator')
const {addToRunQueue} = require('../execution-queue/runQueue')
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
// router.post('/run' , async(req , res)=>{

//     try {

//         console.log("req received run queue");
//         console.log("req at /api/run");

//         const {code , language , inputValue} = req.body.payload;
//         const filePath = await generateFile(code , extension[language])

//         let jobDoc = new Job({
//             status : "queue",
//             problemId : null,
//             userId : null,
//             filePath : filePath,
//             inputValue : inputValue,
//             language: language,
//             code: code,  
//         })
//         await jobDoc.save();
//         addToRunQueue(jobDoc._id)
//         res.status(201).json({msg : "added to queue"})        
   
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json(error)
//     }
// })

// router.post('/submit' , async(req , res)=>{

//     try {

//         console.log("req at /api/submit");

//         const {code , language} = req.body.payload;
//         const filePath = await generateFile(code , extension[language])

//         let output;
//         const input = fs.readFileSync('./testcases/input.txt', { encoding: 'utf8', flag: 'r' });
//         const finalOutput = fs.readFileSync('./testcases/output.txt', { encoding: 'utf8', flag: 'r' });
//         CorrectOutput = finalOutput.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
//         // CorrectOutput = finalOutput

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
//         if(output.trim() == CorrectOutput.trim()){
//             res.json({verdict : true , output , CorrectOutput})
//         }
//         else{
//             res.json({verdict : false , output , CorrectOutput})
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode && 500).json(error)
//     }
// })

router.get('/problems' , async(req , res)=>{
    try {
        const problems = await Problem.find().sort({createdAt:-1}).populate('authorId' , 'image')
        res.json(problems)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/problem/:id' , async(req , res)=>{
    try {
        const {id} = req.params;
        const problems = await Problem.findById(id).populate('authorId' , 'image')
        res.json(problems)
    } catch (error) {
        res.status(500).json(error)
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

router.post('/create' , isLoggedIn, isAdmin ,async(req , res)=>{
    try {
        
        // res.status(503).json({message : "Owner Of this site has closed this Route."})
        // return
        console.log("Create request received!");
        const {problem} = req.body;
        problem.author = req.user.username;
        problem.authorId = req.user._id;
        problem.output = problem.output.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        problem.output = problem.output.trim()
        // console.log(req.body);

        const problemDoc = await Problem.create(problem)

        res.json(problemDoc)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.put('/problem/:id' , isLoggedIn, isAdmin , async(req , res)=>{
    try {
        const {id} = req.params
        const {problem} = req.body;
        // console.log("update req received! " , id);
        // console.log(problem);
        const newProblem = await Problem.findByIdAndUpdate(id , problem , {new:true})
        res.json(newProblem)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/problem/:id/like' , isLoggedIn,async(req  , res )=>{
    const userId = req.user._id
    const {id} = req.params;

    // const new_doc = await Problem.findByIdAndUpdate(id , {$inc :{likes : 1}} , {new : true})
    
    
    
    await Problem.findByIdAndUpdate(id, { $pull: { dislikes: userId } })
    const new_doc = await Problem.findByIdAndUpdate(id, { $addToSet: { likes: userId } } , {new : true})

    res.status(200).json(new_doc)   
    await User.findByIdAndUpdate(userId, { $pull: { dislikedProblems: id } })
    await User.findByIdAndUpdate(userId, { $addToSet: { likedProblems: id } })

})
router.put('/problem/:id/dislike' ,isLoggedIn, async(req  , res )=>{
    const userId = req.user._id
    const {id} = req.params;
    // const new_doc = await Problem.findByIdAndUpdate(id , {$inc :{dislikes : 1}} , {new : true})

    await Problem.findByIdAndUpdate(id, { $pull: { likes: userId } })
    const new_doc = await Problem.findByIdAndUpdate(id, { $addToSet: { dislikes: userId } } , {new:true})

    res.status(200).json(new_doc)   

    await User.findByIdAndUpdate(userId, { $addToSet: { dislikedProblems: id } })
    await User.findByIdAndUpdate(userId, { $pull: { likedProblems: id } })    
})

router.put('/problem/:id/remove' ,isLoggedIn, async (req , res)=>{

    const {remove} = req.query;
    const userId = req.user._id
    const {id} = req.params;

    console.log('remove req');

    if(remove == "unlike"){
        await User.findByIdAndUpdate(userId, { $pull: { likedProblems: id } })
        const new_doc = await Problem.findByIdAndUpdate(id, { $pull: { likes: userId } } , {new : true})   
        
        res.status(200).json(new_doc)
    }
    else{
        await User.findByIdAndUpdate(userId, { $pull: { dislikedProblems: id } })
        const new_doc = await Problem.findByIdAndUpdate(id, { $pull: { dislikes: userId } } , {new : true})

        res.status(200).json(new_doc)
    }
})

module.exports = router 