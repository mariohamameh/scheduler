import React, { Fragment } from 'react'
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
    const {time, interview} = props;
    
    if (!time) {
        return <article className="appointment">No Appointments</article>;
    } 

    return(
        <article className="appointment">
            <Header time = {props.time} />
            {interview ? <Show student = {interview.student} interviewer = {interview.interviewer.name}/> : <Empty />}
        </article>
    )
    
    
}
