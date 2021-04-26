import React from "react";
import "./Tasks.scss";

function Tasks({ task_text, removeTask }) {
  return (
    <div className="task-container" onClick={removeTask}>
      {task_text}
    </div>
  );
}

export default Tasks;
