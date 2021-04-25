import React from "react";
import "./Tasks.scss";

function Tasks({ task_text, removeTask }) {
  // const
  return (
    <div className="task-container" onClick={removeTask}>
      {/* <div className="task-info">{task_text}</div> */}
      {task_text}
    </div>
  );
}

export default Tasks;
