const { Schema, model } = require('mongoose')

const problemSchema = new Schema({

    name: String,
    intro: String,
    description: String,
    difficulty: {
        type: String,
        enum: ["basic", "easy", "medium", "hard"]
    },
    runCases: String,
    runOutput: String,
    input: String,
    output: String,
    cSolution: String,
    cppSolution: String,
    javaSolution: String,
    pythonSolution: String,
    author : String,

    authorId :{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
    acceptedSubmissions : {
        type : Number,
        default : 0
    },
    rejectedSubmissions : {
        type : Number,
        default : 0
    },
    likes : {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        unique: true
    },
    dislikes : {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        unique: true
    },
    acceptanceRate : {
        type : Number,
        default : 100,
    }
}, {
    timestamps : true,
});

problemSchema.pre('save', function(next) {
    // console.log(this.acceptanceRate);
    const totalSubmissions = this.acceptedSubmissions + this.rejectedSubmissions;
    this.acceptanceRate = (this.acceptedSubmissions / totalSubmissions) * 100;
    this.acceptanceRate = Number(this.acceptanceRate).toFixed(2)
    // console.log('Acceptance rate updated:', this.acceptanceRate);
    next();
});




  

const Problem = model('Problem', problemSchema);
module.exports = Problem