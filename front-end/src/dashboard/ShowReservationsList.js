import React from "react";
import ShowReservation from "./ShowReservation";

function ShowReservationsList({ reservations = [], setErr=()=>{} }){
    return (
        <table className="table table-striped ">
            <thead>
                <tr className="bg-primary text-white">
                    <th >id#</th>
                    <th >First Name</th>
                    <th >Last Name</th>
                    <th >Phone</th>
                    <th >Date</th>
                    <th >Time</th>
                    <th >Party</th>
                    <th >Status</th>
                    <th >Seat / Edit / Cancel</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((reservation, index) => 
                    reservation.status !== "finished" &&
                        <ShowReservation key={index.toString()} reservation={reservation} setErr={setErr}/> )
                }
            </tbody>
        </table>
    );
}

export default ShowReservationsList;