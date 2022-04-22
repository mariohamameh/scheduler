import React from "react";
import "./styles.scss";

export default function Appointment(props) {
    const {time} = props;
    
    if (!time) {
        return <article className="appointment">No Appointments</article>;
    } 

    return <article className="appointment">Appointment at {time} </article>;
}
