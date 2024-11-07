import React from 'react';
import './App.css';
import Button from './Button';
import Input from './Input';
import { TodoProvider, useTodoContext } from './TodoContext';

const TodoList = () => {
  const {
    할일들,
    입력값,
    수정중,
    수정값,
    할일추가,
    할일삭제,
    수정버튼,
    수정완료,
    입력값변경,
    수정값변경,
    수정중변경, 
  } = useTodoContext();

  return (
    <div className="todo-container">
      <h1>할 일 목록</h1>
      <div className="input-container">
        <Input
          value={입력값}
          onChange={(e) => 입력값변경(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="todo-input"
        />
        <Button onClick={할일추가} className="add-button">할 일 등록</Button>
      </div>

      <ul className="todo-list">
        {할일들.map((할일, 인덱스) => (
          <li key={인덱스} className="todo-item">
            {수정중 === 인덱스 ? (
              <div className="edit-container">
                <Input
                  value={수정값}
                  onChange={(e) => 수정값변경(e.target.value)}
                  className="edit-input"
                />
                <Button onClick={() => 수정완료(인덱스)} className="save-button">수정 완료</Button>
                <Button onClick={() => 수정중변경(null)} className="cancel-button">취소</Button>
              </div>
            ) : (
              <>
                <span>{할일}</span>
                <div className="button-group">
                  <Button onClick={() => 수정버튼(인덱스)} className="edit-button">수정 진행</Button>
                  <Button onClick={() => 할일삭제(인덱스)} className="delete-button">삭제하기</Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}

export default App;
