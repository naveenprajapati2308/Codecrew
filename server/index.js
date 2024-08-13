const express = require('express');
const path = require('path')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const port = process.env.PORT || 3000;
const problemRouter = require('./routes/problem')
const userRouter = require('./routes/user.js')
const submissionRouter = require('./routes/submission.js')
const siteRouter = require('./routes/site.js')
const executionRouter = require('./routes/execution.js')

const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user.js');
const { isLoggedIn } = require('./middlewares/userMiddleware.js');
const multer = require('multer')
// app.use(cors())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))


main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect(process.env.CONNECTION_STRING);
  await mongoose.connect("mongodb://127.0.0.1:27017/judge");
  console.log("database connected");
}


const mongostore = MongoStore.create({
  mongoUrl : process.env.CONNECTION_STRING,
  crypto :{
      secret : "faraz the great",
  },
  touchAfter : 24 * 3600,//seconds
})
mongostore.on("error" , (err)=>{
  console.log("ERR in MONGO SESSION STORE : " , err)
})

const sessionOptions = {
  store : mongostore,//session info will be stored in atlas database.
  secret : "faraz the great",
  resave : false,
  saveUninitialized : true,
  cookie :{
      //You only have to write one of 'maxAge' and 'expires'.
      expires : Date.now() + 1*24*60*60*1000,//1 day
      maxAge : 1*24*60*60*1000,
      httpOnly : true,
  }
}
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())//to serialize user into the session
passport.deserializeUser(User.deserializeUser())//to de-serialize user into the session

app.use('/api' , problemRouter)
app.use('/api' , userRouter)
app.use('/api' , submissionRouter)
app.use('/api' , siteRouter)
app.use('/api' , executionRouter)

app.get('/api/test' , isLoggedIn , (req , res)=>{
  res.json("You are logged in")
})

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.use((err , req , res , next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "kuch to gadbad he daya";

  return res.status(statusCode).json({
      success : false,
      statusCode,
      message
  })
})

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});