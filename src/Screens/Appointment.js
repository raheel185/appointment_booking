import React from "react";
import Calendar from "../Components/Calender";
import { useLocation } from "react-router-dom";

function Appointment() {
  const location=useLocation();
  const {
    state: { title, providerName },
  } = location;
  return <div>{<Calendar title={title} providerName={providerName} />}</div>;
}

export default Appointment;
