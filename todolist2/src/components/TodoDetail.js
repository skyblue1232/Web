import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTodoAPI, deleteTodoAPI } from '../redux/todoSlice';
import styled from 'styled-components';

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const todo = todos.find((t) => t.id === parseInt(id));
  const [title, setTitle] = useState(todo?.title || '');
  const [content, setContent] = useState(todo?.content || '');

  const handleUpdate = () => {
    dispatch(updateTodoAPI({ id: parseInt(id), title, content }));
    alert('수정되었습니다.');
  };

  const handleDelete = () => {
    dispatch(deleteTodoAPI(parseInt(id)));
    alert('삭제되었습니다.');
    navigate('/');
  };

  return (
    <DetailsContainer>
      <h2>할 일 상세</h2>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      />
      <ButtonContainer>
        <Button onClick={handleUpdate}>수정</Button>
        <Button onClick={handleDelete}>삭제</Button>
        <Button onClick={() => navigate('/')}>목록으로</Button>
      </ButtonContainer>
    </DetailsContainer>
  );
};

export default TodoDetails;

const DetailsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
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
