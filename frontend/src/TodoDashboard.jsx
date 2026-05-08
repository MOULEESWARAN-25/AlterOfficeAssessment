import { useState, useEffect } from "react";

const mockTodos = [
  {
    id: 1,
    title: "Buy vegetables",
    category: "Groceries",
    completed: false,
  },
  {
    id: 2,
    title: "Finish React assignment",
    category: "Technology",
    completed: true,
  },
];

const sample_todos = ["Groceries", "Technology", "Personal", "Work", "Health"];

export default function TodoDashboard() {
  const [todos, setTodos] = useState(mockTodos);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/todo/");
      const data = await response.json();
      // backend returns objects with todo_id and todo_name
      const mapped = (data || []).map((d) => ({
        id: d.todo_id || d.id,
        title: d.todo_name || d.title || "",
        category: d.category || "Personal",
        completed: !!d.completed,
      }));
      console.log(mapped);
      setTodos(mapped);
    } catch (error) {
      console.error("Fetch todos error:", error);
    }
  };

  const createTodo = async (todo_name) => {
    try {
      const response = await fetch("http://localhost:3000/api/todo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo_name }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Create todo error:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/todo/delete-todo?id=${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Delete todo error:", error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/todo/update-todo?id=${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ new_name: updatedTodo.title }),
        },
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Update todo error:", error);
    }
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title,
      category,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    createTodo(newTodo.title);
    setTitle("");
  };

  const handleToggleTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const updated = { ...todo, completed: !todo.completed };
    const updatedTodos = todos.map((t) => (t.id === id ? updated : t));
    setTodos(updatedTodos);
    updateTodo(id, { ...updated });
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    deleteTodo(id);
  };

  const todosByCategory = sample_todos.reduce((acc, cat) => {
    acc[cat] = todos.filter((todo) => todo.category === cat);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Todo Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Add New Todo
          </h2>

          <form onSubmit={handleAddTodo} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Todo Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sample_todos.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Add Todo
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {sample_todos.map((cat) => {
            const catTodos = todosByCategory[cat];
            return (
              <div key={cat}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {cat} ({catTodos.length})
                </h3>

                {catTodos.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No todos in this category
                  </p>
                ) : (
                  <div className="space-y-2 bg-white rounded-lg shadow-md p-4">
                    {catTodos.map((todo) => (
                      <div
                        key={todo.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleTodo(todo.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          />
                          <span
                            className={`text-sm ${
                              todo.completed
                                ? "text-gray-500 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            {todo.title}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="px-3 py-1 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Total todos: {todos.length} | Completed:{" "}
            {todos.filter((t) => t.completed).length}
          </p>
        </div>
      </div>
    </div>
  );
}
