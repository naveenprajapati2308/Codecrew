const { Schema, model } = require('mongoose')

const submissionSchema = new Schema({

    user: String,
    email: String,
    problemName: String,
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ["Accepted", "Rejected"]
    },
    message: {
        type: String,
        enum: ["Correct Output", "Wrong Answer", "Compilation Error"]
    },
    
    errorMessage : String,
    language: String,
    code: String,
    runtime : Number,

    FailedInfo: {
        correctFormat: Boolean,
        result: String,
        passed: Number,
        correctOutput: String,
        userOutput: String,
        testCase: String,
        total: Number,
    }

}, {
    timestamps: true,
});

const Submission = model('Submission', submissionSchema);
module.exports = Submission