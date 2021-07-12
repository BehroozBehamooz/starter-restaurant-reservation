const asyncErrorBoundry = require("../../errors/asyncErrorBoundary");
const filename = "seat.controllers.js";
const { reservationExists } = require("../../reservations/reservations.controller");
const service = require("./seat.service");


function hasSufficientCapacity(req, res, next){
    req.log.debug({filename, methodName:"hasSufficientCapacity"});
    const { capacity } =  res.locals.table;
    const { people } = res.locals.reservation;
    req.log.trace({filename, methodName:"hasSufficientCapacity", capacity, people});

    if (people > capacity){
        return next({
            status : 400,
            message : "table does not have sufficent capacity",
        });
    }
    next();
}

function isOccupied(req, res, next){
    const { reservation_id } = res.locals.table;
    if (reservation_id !== null){
        return next({
            status : 400,
            message : "Table is occupied",
        });
    }
    next();
}

function reservationIsAlreadySeated(req, res, next){
    if ( res.locals.reservation.status === "seated" ){
        return next({
            status : 400,
            message : "the reservation is already seated"
        });
    }
    next();
}

async function update(req, res){
    req.log.debug({filename, methodName: "update"});
    const { reservation_id } = req.body.data;
    const table_id  = Number(req.params.table_id);
    const data = await service.update(table_id, reservation_id);
    req.log.trace({filename, methodName: "update", reservation_id, table_id, data});
    res.json({ data, });
}

function isNotOccupied(req, res, next){
    req.log.debug({filename, methodName: "isNotOccupied"});
    const { reservation_id } = res.locals.table;
    req.log.trace({filename, methodName:"isNotOccupied", reservation_id});
    if ( reservation_id === null ){
        return next({
            status : 400,
            message : "Table is not occupied.",
        });
    }
    next();
}

async function destroy(req, res){
    req.log.debug({filename, methodName:"destroy"});
    const data = await service.delete(res.locals.table.table_id, res.locals.table.reservation_id);
    req.log.trace({filename, methodName:"destroy" , data,});
    res.json({ data, });
}

module.exports = {
    update: [
        reservationExists, 
        hasSufficientCapacity,
        isOccupied,
        reservationIsAlreadySeated,
        asyncErrorBoundry(update),
    ],
    delete: [ isNotOccupied, asyncErrorBoundry(destroy)],
}