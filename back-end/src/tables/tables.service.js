const knex = require("../db/connection");
const tableName = "tables";

function create(newTable){
    return knex(tableName)
        .insert(newTable, "*")
        .then( (result) => result[0] );
        /* The .insert() method of Knex can be used to insert more than one record, 
        so when used with "*" it returns an array of the records inserted. 
        For this API, only one table will ever be inserted at a time */
}

function read(table_id){
    return knex(tableName)
        .select()
        .where({table_id : Number(table_id)})
        .first();
}

function list(){
    return knex(tableName)
        .select("*")
        .orderBy("table_name");
}

module.exports = {
    create,
    read,
    list,
}