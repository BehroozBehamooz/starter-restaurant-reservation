const knex = require("../../db/connection");
const tableName = "tables";

function update(table_id, reservation_id){
    return knex.transaction( async function(trx){
        try{
            const updatedTable = await trx("tables")
                .select("*")
                .where({table_id,})
                .update({reservation_id,}, "*")
                .then((result)=>result[0]);
            
            const updatedReservation = await trx("reservations")
                .select("*")
                .where({reservation_id,})
                .update({status : "seated"})
                .then((result)=>result[0]);
            
            return {updatedTable, updatedReservation};
        }
        catch(error){
            console.error(error.stack);
            throw error;
        }
    });
}

function destroy(table_id, reservation_id){
    try{
        return knex.transaction( async function (trx){
            const updatedTable = await trx("tables")
                .select("*")
                .where({table_id,})
                .update({reservation_id: null})
                .then ( (result) => result[0] );
            
            const updatedReservation = await trx("reservations")
                .select("*")
                .where({reservation_id,})
                .update({ status: "finished"})
                .then ( (result) => result[0] );
            
                return {updatedTable, updatedReservation};
            });
    }
    catch(error){
        console.error(error.stack);
        throw error;   
    }
    
}

module.exports = {
    update,
    delete:destroy,
}