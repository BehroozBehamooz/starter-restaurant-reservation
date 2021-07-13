import React from "react";
import { Link, useHistory } from "react-router-dom";
import { cancelReservation }  from "../utils/api";
function ShowReservation({ reservation, setErr }) {
  const history = useHistory();

  const cancelHandler = ()=>{
    if (window.confirm("Do you want to cancel this reservation?")){
      cancelReservation(reservation.reservation_id)
      .then(()=>history.go(0))
      .catch(setErr);
    }
  }
  const isBooked = reservation.status === "booked";
  const classNameStatus = isBooked ? 
    " border border-1 border-primary rounded-pill p-2" : 
    " bg-info text-light rounded-pill p-2 border border-2 border-primary "
  return (
    <tr>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td className="align-middle" data-reservation-id-status={reservation.reservation_id}>
        <span className={classNameStatus}><strong>{reservation.status}</strong></span>
      </td>
      <td className="text-center">
        {reservation.status === "booked" && (
          <>
            <Link
              to={`/reservations/${reservation.reservation_id}/seat`}
              className="btn btn-info btn-sm"
            >
              <span className="material-icons">event_seat</span>
            </Link>

            <Link
              to={`/reservations/${reservation.reservation_id}/edit`}
              className="btn btn-warning btn-sm text-white ml-1"
            >
              <span className="material-icons">edit</span>
            </Link>

            <button
              type="button"
              data-reservation-id-cancel={reservation.reservation_id}
              className="btn btn-danger btn-sm text-white ml-1"
              onClick={cancelHandler}
            >
              <span className="material-icons">delete_forever</span>
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

export default ShowReservation;
