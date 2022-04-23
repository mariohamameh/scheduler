const { default: Appointment } = require("components/Appointment");

export function getAppointmentsForDay(state, day) {
  let onDay = state.days.filter((d) => d.name === day)[0];
  if (!onDay) {
    return [];
  }
  let result = [];
  for (const id of onDay.appointments) {
    const appointmentObj = state.appointments[id];
    result.push(appointmentObj);
  }
  return result;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerID = interview.interviewer;
  const interviewerObj = state.interviewers[interviewerID];
  const result = { student: interview.student, interviewer: interviewerObj };
  return result;
}
