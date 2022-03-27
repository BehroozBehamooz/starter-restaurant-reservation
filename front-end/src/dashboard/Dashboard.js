import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useLocation } from "react-router";
import { today } from "../utils/date-time";
import DateButtons from "./DateButtons";
import ShowTablesList from "./ShowTablesList";
import ShowReservationsList from "./ShowReservationsList";
import "../App.css";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date: thisDate }) {
  const [reservations, setReservations] = useState([]);
  const [dashboardError, setDashboardError] = useState(null);
  const loc = useLocation();
  let query = new URLSearchParams(loc.search);
  const date = query.get("date") || today();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setDashboardError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setDashboardError);
    return () => abortController.abort();
  }
  // const style = {
  //   background: `url("https://pic.onlinewebfonts.com/svg/img_399203.png")`,
  //   width: "50px",
  //   height: "50px",
  // };
  return (
    <main>
      <h1>Dashboard</h1>
      {/* <p className="backicon">Free</p>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date : {date}</h4>
      </div> */}
      <ErrorAlert error={dashboardError} />

      <DateButtons date={date} />
      <ShowReservationsList
        reservations={reservations}
        setDashboardError={setDashboardError}
      />

      <ShowTablesList date={date} />
    </main>
  );
}

export default Dashboard;
