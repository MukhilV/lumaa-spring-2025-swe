import React from "react";

interface Task {
  id?: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

interface TaskTileProps {
  task: Task;
  onUpdateClick: (task: Task) => void;
  onDeleteClick: (task: Task)=> void;
}

const TaskTile: React.FC<TaskTileProps> = ({ task, onUpdateClick, onDeleteClick }) => {
  return (
    <div className="task-card">
      <div className="task-info">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.isComplete ? "✅ Completed" : "❌ Not Completed"}</p>
      </div>
      <button className="update-btn" onClick={() => onUpdateClick(task)}>
        Update
      </button>
      <button className="delete-btn" onClick={() => onDeleteClick(task)}>
        Delete
      </button>
    </div>
  );
};

export default TaskTile;
