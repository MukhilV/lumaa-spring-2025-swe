import React, { useState } from "react";
import axios from "axios";
import UpdateModal from "./UpdateModal";
import "../styles/CreateNewTask.css"; 

interface Task {
  id?: number; // Optional since it's not assigned yet
  title: string;
  description?: string;
  iscomplete: boolean;
}

const CreateNewTask: React.FC<{ refreshTasks: () => void }> = ({ refreshTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = sessionStorage.getItem("userId") || "0";
  const [newTask, setNewTask] = useState<Task>({ id: parseInt(userId), title: "", description: "", iscomplete: false });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    
    setNewTask({ ...newTask,  title: "", description: "", iscomplete: false }); // Reset fields
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/tasks", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
