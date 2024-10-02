import React, { useState } from 'react';
import './App.css';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

function App() {
  const [myTasks, setMyTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addMyTask = (text) => {
    setMyTasks([...myTasks, { text, completed: false }]);
  };

  const completeMyTask = (index) => {
    const newTasks = [...myTasks];
    const [completed] = newTasks.splice(index, 1);
    completed.completed = true;
    setMyTasks(newTasks);
    setCompletedTasks([...completedTasks, completed]);
  };

  const deleteMyTask = (index) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks.splice(index, 1);
    setCompletedTasks(newCompletedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>UMC Min's Plan</h1>
        <TodoInput addMyTask={addMyTask} />
        <TodoList
          myTasks={myTasks}
          completedTasks={completedTasks}
          completeMyTask={completeMyTask}
          deleteMyTask={deleteMyTask}
        />
      </header>
    </div>
  );
}

export default App;
