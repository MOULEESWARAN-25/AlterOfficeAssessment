import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [listTitle, setListTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/api/todo');
    console.log(res);
    setTodos(res.data);
  };

  const createList = async () => {
    await axios.post('http://localhost:5000/todos', { title: listTitle });
    setListTitle('');
    fetchTodos();
  };

  const addTask = async (listId, text) => {
    await axios.post(`http://localhost:5000/todos/${listId}/tasks`, { text });
    fetchTodos();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>My Multi-Task Todos</h1>
      
      <input 
        value={listTitle} 
        onChange={(e) => setListTitle(e.target.value)} 
        placeholder="New List Title..." 
      />
      <button onClick={createList}>Create List</button>

      <div style={{ marginTop: '20px' }}>
        {todos.map(list => (
          <div key={list.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
            <h3>{list.title}</h3>
            <ul>
              {list.tasks.map(task => <li key={task.id}>{task.text}</li>)}
            </ul>
            <TaskInput onAdd={(text) => addTask(list.id, text)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskInput({ onAdd }) {
  const [text, setText] = useState('');
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add task..." />
      <button onClick={() => { onAdd(text); setText(''); }}>Add</button>
    </div>
  );
}

export default App;
