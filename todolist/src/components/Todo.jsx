import React, { useState, useEffect } from "react";
import { TodoContainer, TodoInput, TodoButton, TodoListItem, TodoTitle } from "./TodoListStyles";
import useFetch from "../components/useFetch";

export const Todo = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/todo");
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!title || !content) return alert("제목과 내용을 입력해주세요.");
    setLoading(true);
    try {
      await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      fetchTodos();
    } catch (err) {
      setError(err.message);
    } finally {
      setTitle("");
      setContent("");
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:3000/todo/${id}`, { method: "DELETE" });
      fetchTodos();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContainer>
      <h1>할 일 목록</h1>
      <div>
        <TodoInput
          type="text"
          placeholder="제목 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TodoInput
          type="text"
          placeholder="내용 입력"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <TodoButton onClick={addTodo} disabled={loading}>
          추가
        </TodoButton>
      </div>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {todos.map((todo) => (
          <TodoListItem key={todo.id}>
            <TodoTitle>{todo.title}</TodoTitle>
            <TodoButton onClick={() => deleteTodo(todo.id)}>삭제</TodoButton>
          </TodoListItem>
        ))}
      </ul>
    </TodoContainer>
  );
};

export default Todo;
