const service = require("./tables.service");
const asyncErrorBoundry = require("../errors/asyncErrorBoundary");
const { reservationExists } = require("../reservations/reservations.controller");
const filename = "tables.controllers.js";

function hasData(req, res, next){
    if (!req.body.data){
        return next({
            status : 400,
            message : "body is missing",
        });
    }
    next();
}

function hasValidTableName(req, res, next){
    const { table_name } = req.body.data;
    if(!table_name || table_name.trim().length <= 1 ){
        return next({
            status : 400,
            message : "Must have a valid table_name",
        });
    }
    next();
}

function hasValidCapacity(req, res, next){
    const { capacity } = req.body.data;
    if(!capacity || typeof capacity !== "number" || isNaN(capacity) || capacity <=0 ){
        return next({
            status : 400,
            message : "Must have a valid capacity",
        });
    }
    next();
}

async function create(req, res){
    req.log.debug({filename, methodName:"create"});
    const newTable = req.body.data;
    const data = await service.create(newTable);
    req.log.trace({filename, methodName:"create", data,});
    res.status(201).json({ data, });
}

async function tableExists(req, res, next){
    req.log.debug({filename, methodName:"tableExists"});
    const { table_id } = req.params;
    if (!table_id){
        return next({
            status : 400,
            message : `:table_id is missing in in path: ${req.originalUls}`,
        });
    }
    const found = await service.read(table_id);
    req.log.trace({filename, methodName:"tableExists", table_id, found,});
    if (!found){
        return next({
            status : 404,
            message : `table_id: ${table_id} not found in path: ${req.originalUls}`,
        });
    }
    res.locals.table = found;
    next();
}

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
    const data = await service.delete(res.locals.table.table_id);
    req.log.trace({filename, methodName:"destroy" , data,});
    res.json({ data, });
}

async function list(req, res){
    const data = await service.list();
    res.json({ data, });
}

module.exports ={
    create: [hasData, hasValidTableName, hasValidCapacity, asyncErrorBoundry(create)],
    update: [
        hasData, 
        reservationExists, 
        asyncErrorBoundry(tableExists),
        hasSufficientCapacity,
        isOccupied,
        asyncErrorBoundry(update),
    ],
    delete: [asyncErrorBoundry(tableExists), isNotOccupied, asyncErrorBoundry(destroy)],
    list: [asyncErrorBoundry(list)],
}