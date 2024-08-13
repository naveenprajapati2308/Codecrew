const Queue = require("bull");
const Job = require("../models/job");

const path = require('path')
const fs = require('fs')

const {generateFile , extension , executeCpp , compileCpp} = require('../utils/methods');
const {executePython} = require('../utils/pythonExecutor')
const {compileJava , executeJava} = require('../utils/javaExecutor');



const jobQueue = new Queue("job-runner-queue");
const NUM_WORKERS = 2;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
  const id = data.id;
  const jobDoc = await Job.findById(id);
  jobDoc.status = "compiling"
  await jobDoc.save()

  const startTime = Date.now()
  jobDoc.runResult.processStartTime = startTime - jobDoc.createdAt;
  let midTime = null;
  

  try {
    const {language , filePath , inputValue } = jobDoc;
    let output;



    if(language == "cpp" || language=="c"){
        const jobId = await compileCpp(filePath)
        jobDoc.status = "running"
        await jobDoc.save()
        midTime = Date.now()
        output = await executeCpp(jobId , inputValue)
    }
    else if(language == "python"){
        midTime = Date.now()
        jobDoc.status = "running"
        await jobDoc.save()
        output = await executePython(filePath , inputValue)
    }
    else if(language == "java"){
        const filename = await compileJava(filePath)
        jobDoc.status = "running"
        await jobDoc.save()
        midTime = Date.now()
        output = await executeJava(filename , inputValue)
    }

    const endTime = Date.now()

    jobDoc.runResult.output = output;
    jobDoc.runResult.failureType = null;
    jobDoc.runResult.isError = false;
    jobDoc.status = "completed";

    // console.log("This happened");
    // console.log(id);
    // console.log(output);

    jobDoc.runResult.executionTime = endTime - midTime
    jobDoc.runResult.processCompletionTime = endTime - startTime;
    jobDoc.runResult.totalTime = endTime - jobDoc.createdAt;

    await jobDoc.save();
    return true;

  } catch (error) {
    const endTime = Date.now()

    console.log(error);

    jobDoc.runResult.executionTime = endTime - midTime ? midTime : endTime
    jobDoc.runResult.processCompletionTime = endTime - jobDoc.createdAt;
    jobDoc.runResult.totalTime = endTime - jobDoc.createdAt;



    jobDoc.runResult.output = error.message;
    jobDoc.runResult.failureType = error.type;
    jobDoc.runResult.isError = true;
    jobDoc.status = "completed"

    await jobDoc.save();
    return true;
  }

});

jobQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});

const addToRunQueue = async (jobId) => {
  jobQueue.add({
    id: jobId,
  });
};

module.exports = {
  addToRunQueue,
};