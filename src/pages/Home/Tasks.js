import React from "react";
import "./Tasks.scss";

function Tasks({ task_text }) {
  // const
  return (
    <div className="task-container">
      <div className="task-info-container">
        <div className="task-info">{task_text}</div>
        {/* <div className="task-info">9:00am</div> */}
      </div>
    </div>
  );
}

export default Tasks;
