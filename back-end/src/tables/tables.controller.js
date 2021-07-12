const service = require("./tables.service");
const asyncErrorBoundry = require("../errors/asyncErrorBoundary");
const filename = "tables.controllers.js";

function bodyHasData(req, res, next){
    if (!req.body.data){
        return next({
            status : 400,
            message : "body must have data",
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


async function list(req, res){
    const data = await service.list();
    res.json({ data, });
}

module.exports ={
    create: [bodyHasData, hasValidTableName, hasValidCapacity, asyncErrorBoundry(create)],
    list: [asyncErrorBoundry(list)],
    bodyHasData,
    tableExists:[asyncErrorBoundry(tableExists)],
}