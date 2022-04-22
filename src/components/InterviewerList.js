import React from "react";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewerList = props.interviewers.map((interviewer) => {
    return <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />  
  }
  )
  return (
  <ul> 
      {interviewerList} 
</ul>)
}
