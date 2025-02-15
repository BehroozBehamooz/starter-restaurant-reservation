//my own version of error boundry
function asyncErrorBoundary(delegate,defaultStatus){
    return (req, res, next)=>{
        try{
            delegate(req, res, next);
        }
        catch(error){
            req.log.debug({__filename, methodeName:"asyncErrorBoundary"});
            const { status=defaultStatus, message=error || "Internal Server Error" } = error;
            req.log.trace({ __filename, methodeName:"asyncErrorBoundary", delegate : delegate, errMessage : error });
            next({
                status,
                message,
            });
        }
    }
}

module.exports = asyncErrorBoundary;
