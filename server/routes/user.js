const express = require('express')
const router = express.Router()
const passport = require('passport')
const userMiddleware = require('../middlewares/userMiddleware')
// const userController = require('../controller/user.js')
const User = require('../models/user')
const ExpressError = require('../utils/ExpressError')
const {uploadOnCloudinary , deleteFromCloudinary} = require('../cloudinary/cloudinary')
const {upload} = require('../cloudinary/multer')
const path = require('path')
const multer = require('multer')

router.post('/signup', async (req, res) => {
    try {
        console.log("/signup req received");
        let { username, password , email} = req.body
        // console.log(req.body);
        const new_user = new User({ username , email , image :{url:"https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png"}});
        const userDoc = await User.register(new_user, password)//will automatically check if username is unique or not.
        //register() method added by passport-local-mongoose
        //will register user in database as well.

        //login the user after signup
        req.login(userDoc, (err) => {
            if (err) {
                throw new ExpressError(500, err.message, "login failure after signup")
            }
            res.json(userDoc)
        })
    } catch (error) {

        const customError = new ExpressError(error.status ? error.statusCode : 400, error.message, error.type ? error.type : error.name)
        res.status(customError.statusCode).json(customError)
    }
})

//req.body should have 'username' and password from frontend
router.post('/login',passport.authenticate("local"), (req, res) => {
    res.json(req.user)
})

router.get('/logout', (req, res) => {
    try {
        //This method is by 'passport'. it takes a callback with error parameter.
        // will remove req.user and remove user from session
        req.logout((err) => {
            if (err) {
                throw err
            }
            res.status(200).json("logged out")
        })
    } catch (error) {
        res.status(500).json(error)
    }

})

router.get('/profile' , userMiddleware.isLoggedIn ,(req , res)=>{
    res.json(req.user)
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/user/:username', async (req, res) => {
    try {

        const points = {
            'basic': 10,
            'easy': 30,
            'medium': 80,
            'hard': 150
        }

        const { username } = req.params
        const user = await User.findOne({username : username}, { hash: 0, salt: 0 })
            .populate({
                path: 'submissions',
                options: { sort: { createdAt: -1 } }  // This sorts the populated submissions
            })
            .populate('dislikedProblems')
            .populate('likedProblems')
            .populate('solved')
            .populate('saved')
        
            
            let count = 0;
            for (const problem of user.solved) {
                count += points[problem.difficulty];
            }
            let processedUser = user.toObject()
            processedUser.points = count;

        res.status(200).send(processedUser)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/user/save' , userMiddleware.isLoggedIn ,async(req , res)=>{
    try {
        
        const {problemId} = req.query;
        const {_id , username} = req.user

        const {saved} = await User.findByIdAndUpdate(_id , {$addToSet : {saved : problemId}} , {new : true})

        res.status(200).json("ok")

    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/user/unsave' , userMiddleware.isLoggedIn , async (req , res)=>{
    try {
        const {problemId} = req.query;
        const {_id , username} = req.user
        

        const {saved} = await User.findByIdAndUpdate(_id , {$pull : {saved : problemId}} , {new : true})

        res.status(200).json("ok")

    } catch (error) {
        const e = new ExpressError(500 , error.message , "update image failed")
        res.status(500).send(e)
    }
})



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         // cb(null, file.fieldname + '-' + uniqueSuffix)

//         cb(null, file.originalname)
//     }
// })
// const upload = multer({ storage: storage })

router.post('/user/update' , userMiddleware.isLoggedIn , upload.single('file') ,async (req , res)=>{
try {
    // console.log("req came!");
    const {_id , image : img} = req.user;
    const previousId = img.public_id
    // console.log(req.user);

    // console.log(req.file)

    const filePath = path.join(__dirname ,'..', `uploads/${req.file.originalname}`)
    const response = await uploadOnCloudinary(filePath);
    const image = {
        public_id : response.public_id,
        url : response.url,
    }

    const userDoc = await User.findByIdAndUpdate(_id , {image} , {
        new : true,
    })

    res.json(userDoc)

    try {
        deleteFromCloudinary(previousId)
    } catch (error) {
        console.log(error);
    }
} catch (error) {
    console.log(error);
    res.status(500).json(error)
}
})
module.exports = router

