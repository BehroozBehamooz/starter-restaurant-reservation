const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
const service = require ("./status.service");
const filename = "status.controller.js";

function bodyHasStatus(req, res, next){
    const { status } = req.body.data;
    if ( !status ){
        return next({
            status : 400,
            message : "body must have status property",
        });
    }
    res.locals.status = status;
    next();
}

function hasValidStatus(req, res, next){
    const validStatus = ["booked", "seated", "finished"];
    if ( !validStatus.includes(res.locals.status) ){
        return next({
            status : 400,
            message : `${res.locals.status} is not a valid status`,
        });
    }
    next();
}

function reservationIsFinished(req, res, next){
    if ( res.locals.reservation.status === "finished" ){
        return next({
            status : 400,
            message : "a finished reservation cannot be updated"
        });
    }
    next();
}

async function update(req, res){
    req.log.debug({filename:"status.controller.js", methodName:"update"});
    const data = await service.update(res.locals.reservation_id, req.body.data.status);
    req.log.trace({filename:"status.controller.js", methodName:"update", reservation_id:res.locals.reservation.reservation_id, status:req.body.data.status, data, });
    res.json({ data, });
}

module.exports = {
    update : [
        bodyHasStatus, 
        hasValidStatus, 
        reservationIsFinished, 
        asyncErrorBoundary(update)
    ],
}