import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });
  const updateSpots = function (state, id) {
    // find the day Object
    const currentDay = state.days.find((d) => d.appointments.includes(id));
    // get the appointment id's array
    const dayIndex = state.days.findIndex((d) => d.id === currentDay.id);
    console.log("dayIndex", dayIndex);

    const nullAppointments = currentDay.appointments.filter(
      (id) => !state.appointments[id].interview
    );
    const spots = nullAppointments.length;

    console.log("spots", spots);
    //deep immutable update
    const newDay = { ...currentDay, spots };
    console.log("new day", newDay);
    console.log("state.day", state.day);
    const newDays = state.days.map((d) => {
      return d.name === state.day ? newDay : d;
    });
    console.log("newDays", newDays);

    setState({ ...state, days: newDays });

    return newDays;
  };
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = {
      ...state,
      appointments,
    };

    return axios.delete(`/api/appointments/${id}`, { interview }).then(() => {
      updateSpots(newState, id);
    });
  }

  const setDay = (day) => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));
  useEffect(() => {
    //axios request here...
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log(all[0]); // first
      console.log(all[1]); // second
      console.log(all[2]); // third
      setState({
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = {
      ...state,
      appointments,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      updateSpots(newState, id);
    });
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
