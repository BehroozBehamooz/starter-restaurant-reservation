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
  return (
    <tr>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      <td>
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
