class ExpressError extends Error{
    constructor(statusCode,message , type){
        super();
        this.statusCode=statusCode;
        this.message=message;
        this.type = type;
    }
}

module.exports=ExpressError;