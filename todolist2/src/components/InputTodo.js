import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAPI, updateTodoAPI } from '../redux/todoSlice';
import styled from 'styled-components';

const InputTodo = ({ existingTodo = null, onClose = () => {} }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(existingTodo?.title || '');
  const [content, setContent] = useState(existingTodo?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() && content.trim()) {
      if (existingTodo) {
        dispatch(updateTodoAPI({ id: existingTodo.id, title, content }));
      } else {
        dispatch(addTodoAPI({ title, content }));
      }
      onClose();
      setTitle('');
      setContent('');
    } else {
      alert('제목과 내용을 입력하세요!');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit">저장</Button>
    </Form>
  );
};

export default InputTodo;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
