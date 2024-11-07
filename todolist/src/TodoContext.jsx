import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [할일들, 할일들변경] = useState([]);
  const [입력값, 입력값변경] = useState("");
  const [수정중, 수정중변경] = useState(null);
  const [수정값, 수정값변경] = useState("");

  const 할일추가 = () => {
    if (입력값.trim() === "") return;
    할일들변경([...할일들, 입력값]);
    입력값변경("");
  };

  const 할일삭제 = (인덱스) => {
    const 새로운할일들 = 할일들.filter((_, i) => i !== 인덱스);
    할일들변경(새로운할일들);
  };

  const 수정버튼 = (인덱스) => {
    수정중변경(인덱스);
    수정값변경(할일들[인덱스]);
  };

  const 수정완료 = (인덱스) => {
    const 새로운할일들 = [...할일들];
    새로운할일들[인덱스] = 수정값;
    할일들변경(새로운할일들);
    수정중변경(null);
    수정값변경("");
  };

  return (
    <TodoContext.Provider
      value={{
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
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
