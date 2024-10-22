import { useState } from 'react';
import '../src/App.css'
import Button from './components/Button';
import Input from './components/Input';

function App() {
  //투두리스트, 화면에 출력되는(추가, 삭제, 수정)
  const [todos,setTodos] = useState([ {id:1,task:'투두 만들어보기'},{id:2, task:'희연 혜원 혜윤 건 찬민'},
  ]);
  const [text, setText]=useState('');

  const [editingId, setEditingId]=useState('');
  const [editText, setEditText]=useState('');

  //렌더링 방지
  const handleSubmit = (e)=>{
    e.preventDefault();
  };
  //1. 추가하기
  const addTodo =()=>{
    setTodos((prev)=>[
      ...prev,
      {id:Math.floor(Math.random()*100)+2, task:text},
    ]);
    setText('');
  };
  //2. 삭제하기
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id));
  };
  //3. 수정하기
  const updateTodo = (id, editText) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, task: editText } : todo))
    );
    setEditingId(null);  // 수정 완료 후 수정 모드 종료
  };

  return (
     <>
      <form onSubmit={handleSubmit}>
        <Input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
        <Button onClick={()=>addTodo()} className="result" type='submit'>할 일 등록</Button>
      </form>
      <div>
        {todos.map((todo, _)=>(
          <div style ={{display:'flex',gap:'20px'}}>
            {/* 수정이 아닐때 */}
            {editingId !== todo.id&&(
              <div key={todo.id} style={{display:'flex',gap:'5px'}}>
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
            )}
            {/* 수정 중 상태일대 */}
            {editingId === todo.id && (
              <div key={todo.id} style={{display:'flex',gap:'5px'}}>
              <p>{todo.id}.</p>
              <Input defaultValue={todo.task} onChange={(e)=>setEditText(e.target.value)} />
            </div>
            )}
            <Button onClick={()=>deleteTodo(todo.id)}>삭제하기</Button>
            {/* editingId !== todo.id 수정이 아닌상태 */}
            {/* editingId === todo.id 수정 중인 상태 */}
            {editingId ===todo.id ?(
              <Button onClick={()=>updateTodo(editingId, editText)}>수정 완료</Button>
            ):(
              <Button onClick={()=>setEditingId(todo.id)}>수정 진행</Button>
            )}
          </div>
        ))}
      </div>
     </>
  )
}

export default App