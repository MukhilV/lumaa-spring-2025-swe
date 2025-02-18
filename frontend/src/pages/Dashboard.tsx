import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskTile from "../components/tsx/TaskTile";
import UpdateModal from "../components/tsx/UpdateModal";
import CreateNewTask from "../components/tsx/CreateNewTask";
import "../styles/styles.css";

interface Task {
  id?: number; // Optional since it's not assigned yet
  title: string;
  description?: string;
  isComplete: boolean;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>("http://localhost:5000/tasks");
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch tasks");
      setLoading(false);
    }
  };

  const handleUpdateClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleDeleteClick = async (task: Task) => {
    if (!task) return;
    try {
      await axios.delete(`http://localhost:5000/tasks/${task.id}`);
      fetchTasks(); // Refresh task list
      handleCloseModal(); // Close modal
    } catch (err) {
      console.error("Error updating task", err);
    }
  };


  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleSave = async () => {
    if (!selectedTask) return;
    try {
      await axios.put(`http://localhost:5000/tasks/${selectedTask.id}`, selectedTask);
      fetchTasks(); // Refresh task list
      handleCloseModal(); // Close modal
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard-container">
      <h2>Task Dashboard</h2>

      {/* Create New Task Button */}
      <CreateNewTask refreshTasks={fetchTasks} />

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => <TaskTile 
        key={task.id} 
        task={task} 
        onUpdateClick={handleUpdateClick}
        onDeleteClick={handleDeleteClick} />)
      )}

      {selectedTask && (
        <UpdateModal
          task={selectedTask}
          onClose={handleCloseModal}
          onSave={handleSave}
          setTask={(task: Task) => setSelectedTask(task)}
        />
      )}
    </div>
  );
};

export default Dashboard;
