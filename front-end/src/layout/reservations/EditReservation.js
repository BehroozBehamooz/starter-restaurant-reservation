import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReservationForm from "./ReservationForm";
import { readReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function EditReservation() {
  const { reservation_id } = useParams();
  const [prevReservation, setPrevReservation] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();
    readReservation(reservation_id, abortController.signal)
      .then(setPrevReservation)
      .catch(setErr);
    return () => abortController.abort();
  }, [reservation_id]);
  if (!prevReservation){
      return false;
  }
  const prevValidReservation = {
    first_name : prevReservation.first_name,
    last_name : prevReservation.last_name,
    mobile_number : prevReservation.mobile_number,
    people : prevReservation.people,
    reservation_date : prevReservation.reservation_date,
    reservation_time : prevReservation.reservation_time,
  }
  return (
    <>
      <ErrorAlert error={err} />
      <ReservationForm
        mode="Edit"
        reservation_id={reservation_id}
        prevReservation={prevValidReservation}
      />
    </>
  );
}

export default EditReservation;
