import React from 'react';

function TodoItem({ myTask, onCompleteMyTask, onDeleteMyTask }) {
  return (
    <div className="todo-item-wrapper">
      <li className="todo-item">
        {myTask.text}
        {!myTask.completed ? (
          <button onClick={onCompleteMyTask}>완료</button>
        ) : (
          <button onClick={onDeleteMyTask}>삭제</button>
        )}
      </li>
    </div>
  );
}

export default TodoItem;
