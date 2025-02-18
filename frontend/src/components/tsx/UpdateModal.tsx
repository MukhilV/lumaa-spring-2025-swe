import React from "react";
import Task from "../../pages/Dashboard";

interface UpdateModalProps {
  task: Task;
  onClose: () => void;
  onSave: () => void;
  setTask: (task: Task) => void;
}

interface Task {
  id?: number; // Optional since it's not assigned yet
  title: string;
  description?: string;
  isComplete: boolean;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ task, onClose, onSave, setTask }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Task</h3>
        <label>Title:</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="input"
        />
        <label>Description:</label>
        <input
          type="text"
          value={task.description || ""}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="input"
        />
        <label>Status:</label>
        <select
          value={task.isComplete ? "true" : "false"}
          onChange={(e) => setTask({ ...task, isComplete: e.target.value === "true" })}
          className="input"
        >
          <option value="false">Not Completed</option>
          <option value="true">Completed</option>
        </select>
        <div className="modal-buttons">
          <button className="save-btn" onClick={onSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
