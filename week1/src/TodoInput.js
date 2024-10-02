import React, { useState } from 'react';

function TodoInput({ addMyTask }) {
  const [myInput, setMyInput] = useState('');

  const handleSubmitMyTask = (e) => {
    if (e.key === 'Enter') {
      addMyTask(myInput);
      setMyInput('');
    }
  };

  return (
    <div>
      <hr className="full-width-hr" />

      <input
        type="text"
        value={myInput}
        onChange={(e) => setMyInput(e.target.value)}
        onKeyUp={handleSubmitMyTask}
        placeholder="민의 스터디 계획 입력"
        style={{ width: '700px', height: '50px', fontSize: '18px' }}
      />
    </div>
  );
}

export default TodoInput;
