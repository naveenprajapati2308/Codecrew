const { Schema, model } = require('mongoose')

//Same job object is used for both run and submission

const jobSchema = new Schema({

    status : {
        type :String,
        enum : ['queue' , 'compiling' , 'running-tests' , 'running' , 'completed'],
        default : "queue",
    },
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    submissionId: {
        type: Schema.Types.ObjectId,
        ref: 'Submission'
    },

    filePath : String,
    inputValue : String,
    language: String,
    code: String,
    
    //submit result will be used directlu from submission
    runResult : {
        output : {
            type : String,
        },
        failureType : String,
        isError : Boolean,
        processStartTime : Number,
        executionTime : Number,
        processCompletionTime : Number,//includes compile and runTime
        totalTime : Number,//total time from when job was added to queue
    },
    output : String,

}, {
    timestamps: true,
});

const Job = model('Job', jobSchema);
module.exports = Job