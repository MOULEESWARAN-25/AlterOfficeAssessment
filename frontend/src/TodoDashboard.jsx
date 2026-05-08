import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TodoDashboard() {
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");
  const [taskNames, setTaskNames] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const getConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const loadData = async () => {
    try {
      const response = await axios.get("https://todo-app-alteroffice.vercel.app/api/task/", getConfig());
      setLists(response.data || []);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        logout();
      }
      console.error(error);
    }
  };

  const addList = async (e) => {
    e.preventDefault();
    if (!listName.trim()) return;

    try {
      await axios.post("https://todo-app-alteroffice.vercel.app/api/todo/", { todo_name: listName }, getConfig());
      setListName("");
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const removeList = async (id) => {
    try {
      await axios.delete(`https://todo-app-alteroffice.vercel.app/api/todo/delete-todo?id=${id}`, getConfig());
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const renameList = async (id, currentName) => {
    const newName = prompt("Enter new list name:", currentName);
    if (!newName || newName === currentName) return;

    try {
      await axios.patch(`https://todo-app-alteroffice.vercel.app/api/todo/update-todo?id=${id}`, { new_name: newName }, getConfig());
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (listId) => {
    const taskName = taskNames[listId];
    if (!taskName?.trim()) return;

    try {
      await axios.post(`https://todo-app-alteroffice.vercel.app/api/task/?todo_id=${listId}`, { task_name: taskName }, getConfig());
      setTaskNames({ ...taskNames, [listId]: "" });
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const removeTask = async (taskId, listId) => {
    try {
      await axios.delete(`https://todo-app-alteroffice.vercel.app/api/task/delete-task?id=${taskId}&todo_id=${listId}`, getConfig());
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const renameTask = async (taskId, listId, currentName) => {
    const newName = prompt("Enter new task name:", currentName);
    if (!newName || newName === currentName) return;

    try {
      await axios.patch(`https://todo-app-alteroffice.vercel.app/api/task/update-task?id=${taskId}&todo_id=${listId}`, { new_name: newName }, getConfig());
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
          <button 
            onClick={logout} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Create a New List</h2>
          <form onSubmit={addList} className="flex gap-2">
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="List name"
              className="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add List
            </button>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {lists.map((list) => (
            <div key={list.todo_id} className="bg-white p-5 rounded-lg shadow border border-gray-200">
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h3 className="text-lg font-bold text-gray-800">{list.todo_name}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => renameList(list.todo_id, list.todo_name)} 
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Rename
                  </button>
                  <button 
                    onClick={() => removeList(list.todo_id)} 
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mb-4">
                {(!list.Tasks || list.Tasks.length === 0) ? (
                  <p className="text-gray-500 text-sm">No tasks yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {list.Tasks.map((task) => (
                      <li key={task.id} className="flex justify-between items-center bg-gray-50 p-2 rounded border">
                        <span className="text-gray-700">{task.task_name}</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => renameTask(task.id, list.todo_id, task.task_name)} 
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => removeTask(task.id, list.todo_id)} 
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  value={taskNames[list.todo_id] || ""}
                  onChange={(e) => setTaskNames({ ...taskNames, [list.todo_id]: e.target.value })}
                  placeholder="New task..."
                  className="flex-1 border border-gray-300 p-2 text-sm rounded focus:outline-none focus:border-green-500"
                />
                <button 
                  onClick={() => addTask(list.todo_id)} 
                  className="bg-green-600 text-white px-3 py-2 text-sm rounded hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
          {lists.length === 0 && (
            <p className="text-gray-600 col-span-2 text-center py-8">
              No lists found. Create one to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
