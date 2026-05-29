import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // FETCH TASKS
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await API.get("/tasks");
        setTasks(data.tasks || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, []);

  // LOGOUT (FIXED)
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // CREATE / UPDATE
  const handleSave = async () => {
    if (!title.trim()) return;

    try {
      const payload = { title, priority };

      if (editId) {
        const { data } = await API.put(`/tasks/${editId}`, payload);
        setTasks((prev) =>
          prev.map((t) => (t._id === editId ? data.task : t))
        );
        setEditId(null);
      } else {
        const { data } = await API.post("/tasks", payload);
        setTasks((prev) => [...prev, data.task]);
      }

      setTitle("");
      setPriority("Medium");
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // STATUS UPDATE
  const updateStatus = async (taskId, status) => {
    try {
      const { data } = await API.patch(`/tasks/${taskId}/status`, {
        status,
      });

      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? data.task : t))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT
  const startEdit = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setPriority(task.priority);
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>TaskFlow Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* INPUT */}
      <div className="task-input-card">
        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={handleSave}>
          {editId ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* EMPTY STATE */}
      {tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks yet</h3>
          <p>Create your first task to organize your work</p>
        </div>
      ) : (
        <div className="task-list">

          {tasks.map((task) => (
            <div key={task._id} className="task-card">

              <div className="task-header">
                <h3 className={task.status === "Completed" ? "done" : ""}>
                  {task.title}
                </h3>

                <span className={`priority ${task.priority?.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>

              <div className="status-row">
                <span className="status-text">{task.status}</span>

                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task._id, e.target.value)
                  }
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="task-actions">
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Dashboard;