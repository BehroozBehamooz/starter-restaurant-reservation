const knex = require("../db/connection");
const tableName = "reservations";

function create(newReservation) {
  return knex(tableName)
    .insert(newReservation, "*")
    .then((result) => result[0]);
}

function read(reservation_id) {
  return knex(tableName)
    .select()
    .where({ reservation_id: Number(reservation_id) })
    .first();
}

function update(reservation_id, editedReservation){
    return knex(tableName)
        .where({ reservation_id, })
        .update(editedReservation, "*")
        .then( (result)=>result[0] );
}

function list(param) {
  if (Object.keys(param).length) {
    const [key, value] = Object.entries(param)[0];
    switch (key) {
      case "date":
        return knex(tableName)
          .select()
          .where({ reservation_date: value })
          .andWhereNot({ status: "finished" })
          .orderBy("reservation_time");
      case "mobile_number":
        return knex("reservations")
          .whereRaw(
            "translate(mobile_number, '() -', '') like ?",
            `%${value.replace(/\D/g, "")}%`
          )
          .orderBy("reservation_date");
      // return knex(tableName)
      //     .select()
      //     .where(knex.raw(`${key} like '%${value}%'`))
      //     .orderBy("reservation_date", "desc");
    }
  } else {
    return knex(tableName)
      .select()
      .orderBy("reservation_date", "reservation_time");
  }
}

module.exports = {
  create,
  read,
  update,
  list,
};
