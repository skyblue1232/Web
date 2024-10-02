import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ myTasks, completedTasks, completeMyTask, deleteMyTask }) {
  return (
    <div className="todo-container">
      <div className="todo-section">
        <h4>해야 할 일</h4>
        <ul>
          {myTasks.map((myTask, index) => (
            <TodoItem
              key={index}
              myTask={myTask}
              onCompleteMyTask={() => completeMyTask(index)}
            />
          ))}
        </ul>
      </div>
      <div className="todo-section">
        <h4>해낸 일</h4>
        <ul>
          {completedTasks.map((myTask, index) => (
            <TodoItem
              key={index}
              myTask={myTask}
              onDeleteMyTask={() => deleteMyTask(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
