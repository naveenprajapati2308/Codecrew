const ExpressError = require("../utils/ExpressError");

const isLoggedIn  = (req , res , next)=>{

    // console.log("current path : " , req.path , " AND originalUrl : " , req.originalUrl);

    //req.isAuthenticated() is added by passport. Checks whether the user is authenticated or not.
    //logging in is done by passport.authenticate("local" , options) which is implemented in user controller.
    //passport.authenticate("local" , options) adds req.user to the request object and in session
    if(!req.isAuthenticated()){
        res.status(401).json(new ExpressError(401 , "you are not authorized" , "unauthorized"))
        return 
    }
    next()
}

const isAdmin = async(req , res , next)=>{
    if(req.user.isAdmin == true){
        next()
    }
    else{
        return res.status(401).json({message : "Restricted for admins Only"})
    }
}
module.exports = {
    isLoggedIn,
    isAdmin
}