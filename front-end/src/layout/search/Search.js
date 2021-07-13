import React, { useState } from "react";
import ShowReservationsList from "../../dashboard/ShowReservationsList";
import { listReservations } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function Search() {
  const [mobile, setMobile] = useState("");
  const [reservations, setReservations] = useState([]);
  const [err, setErr] = useState(null);

  const changeHandler = ({ target: { value } }) => {
    setMobile(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const mobile_number = mobile.replace(/[^0-9]/g, "");
    listReservations({ mobile_number })
        .then( (result)=>{
            setReservations(result);
            if ( !result.length ){
                throw new Error("No reservations found");
            }else if (err){
                setErr(null);
            } 
        })
        .catch(setErr);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="border border-1 p-4 m-4">
        <div>
          <ErrorAlert error={err} />
        </div>
        <div className="card">
          <div className="card-header alert alert-primary">
            Search By Phone Number
          </div>
          <div className="card-body">
            <div className="row">
              <div className="form-group col">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary text-white">
                      +1
                    </span>
                  </div>
                  <input
                    type="tel"
                    name="mobile_number"
                    id="mobile_number"
                    className="form-control form-control-lg"
                    placeholder="Enter a customer's phone number"
                    required
                    value={mobile}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="form-group col">
                <button type="submit" className="btn btn-primary btn-lg">
                  <span className="oi oi-magnifying-glass"></span> Find
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {reservations.length > 0 &&
         <ShowReservationsList reservations={reservations} setErr={setErr}/> }
    </div>
  );
}

export default Search;
