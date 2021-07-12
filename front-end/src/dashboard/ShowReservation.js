import React from "react";
import { Link } from "react-router-dom";

function ShowReservation({ reservation }) {

  return (
    <tr>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
      <td>
        {
          reservation.status === "booked" &&  
            <Link
              to={`/reservations/${reservation.reservation_id}/seat`}
              className="btn btn-outline-dark"
              //href={`/reservations/${reservation.reservation_id}/seat`}
            >
              Seat
            </Link>
        }
      </td>
    </tr>
  );
}

export default ShowReservation;
