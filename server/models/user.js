const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new Schema({
    email: {
        type: String,
    },
    solved: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Problem'
        }],
        unique: true
    },
    image : {
        url:{
            type : String,
            default : "https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png"
        },
        public_id : String,
    },
    isAdmin: {
        type: Boolean,
        default: false // Default value is false
    },
    likedProblems : {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Problem'
        }],
        unique: true
    },
    dislikedProblems : {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Problem'
        }],
        unique: true
    },
    submissions : {
        type : [{
            type: Schema.Types.ObjectId,
            ref: 'Submission'
        }]
    },
    saved : {
        type : [{
            type: Schema.Types.ObjectId,
            ref: 'Problem'
        }]
    },
    
},{
    timestamps : true,
})


userSchema.plugin(passportLocalMongoose)
//passport-local-mongoose will add 'username', 'hash' and 'salt' fields in schema.
//it will also add methods to your schema. See the docs

const User = mongoose.model("User" , userSchema)
module.exports = User

