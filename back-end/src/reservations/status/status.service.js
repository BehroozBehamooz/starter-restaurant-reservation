const knex = require("../../db/connection");

function update(reservation_id, status){
    return knex("reservations")
        .select("*")
        .where({reservation_id, })
        .update({status,}, "*")
        .then( (result) => result[0] );
}

module.exports = {
    update,
}