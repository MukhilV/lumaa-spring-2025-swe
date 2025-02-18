import React, { useState } from "react";
import axios from "axios";
import UpdateModal from "./UpdateModal";
import "../../styles/styles.css";
// import Task from "../../pages/Dashboard";

interface Task {
  id?: number; // Optional since it's not assigned yet
  title: string;
  description?: string;
  isComplete: boolean;
}

const CreateNewTask: React.FC<{ refreshTasks: () => void }> = ({ refreshTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Task>({ title: "", description: "", isComplete: false });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTask({ title: "", description: "", isComplete: false }); // Reset fields
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/tasks", newTask);
      refreshTasks(); // Refresh task list after creation
      handleCloseModal(); // Close modal
    } catch (err) {
      console.error("Error creating new task", err);
    }
  };

  return (
    <div>
      <button className="create-task-btn" onClick={handleOpenModal}>
        Create New Task
      </button>

      {isModalOpen && (
        <UpdateModal
          task={newTask}
          onClose={handleCloseModal}
          onSave={handleSave}
          setTask={setNewTask}
        />
      )}
    </div>
  );
};

export default CreateNewTask;
