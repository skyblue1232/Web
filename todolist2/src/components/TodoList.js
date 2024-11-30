import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodoAPI, updateTodoAPI } from '../redux/todoSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TodoList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
    setEditingContent(todo.content);
  };

  const handleUpdate = (id) => {
    if (editingTitle && editingContent) {
      dispatch(updateTodoAPI({ id, title: editingTitle, content: editingContent }));
      setEditingId(null);
    } else {
      alert('제목과 내용을 입력하세요.');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingTitle('');
    setEditingContent('');
  };

  return (
    <List>
      {todos.map((todo) => (
        <ListItem key={todo.id}>
          {editingId === todo.id ? (
            <EditingContainer>
              <Input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                placeholder="제목 수정"
              />
              <Textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                placeholder="내용 수정"
              />
              <Actions>
                <Button onClick={() => handleUpdate(todo.id)}>저장</Button>
                <Button onClick={handleCancel}>취소</Button>
              </Actions>
            </EditingContainer>
          ) : (
            <Details>
              <Link to={`/todo/${todo.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Title>{todo.title}</Title>
              </Link>
              <Content>{todo.content}</Content>
              <Actions>
                <Button onClick={() => startEditing(todo)}>수정</Button>
                <Button onClick={() => dispatch(deleteTodoAPI(todo.id))}>삭제</Button>
              </Actions>
            </Details>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;

// 스타일 정의
const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Content = styled.p`
  margin: 0;
  color: #555;
`;

const EditingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 5px;
  resize: none;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
