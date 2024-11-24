import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../Button";
import * as s from "./TodoDetailStyles";
import { debounce } from "lodash";

const API_URL = "http://localhost:3000/todo";

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 const location = useLocation();
  const queryClient = useQueryClient(); // react-query의 캐시 관리

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [updatedTitle, setUpdatedTitle] = useState(""); // 수정 중인 제목
  const [updatedContent, setUpdatedContent] = useState(""); // 수정 중인 내용
  const [todo, setTodo] = useState(null); // 현재 Todo를 로컬 저장소에서 가져온 데이터로 설정
  const [todos, setTodos] = useState([]);
  const query = new URLSearchParams(location.search);
  const searchKeyword = query.get("search") || "";

  const [searchTitle, setSearchTitle] = useState(searchKeyword);
  const [originalTodos, setOriginalTodos] = useState([]); // 원본 데이터 저장
  const [filteredTodos, setFilteredTodos] = useState([]);


  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("할일들"));
    if (savedTodos) {
      setOriginalTodos(savedTodos); 
      const currentTodo = savedTodos.find((item) => item.id === parseInt(id, 10));
      setTodo(currentTodo);
      setTodos(savedTodos);

      if (currentTodo) {
        setUpdatedTitle(currentTodo.title);
        setUpdatedContent(currentTodo.content);
      }
    }
  }, [id]);

  const handleSearch = debounce((value) => {
    setSearchTitle(value); // 검색어 상태 업데이트
    const filtered = originalTodos.filter(
      (todo) =>
        todo.title && // title이 존재하는지 먼저 확인
        todo.title.toLowerCase().includes(value.toLowerCase()) // 이후에 toLowerCase() 호출
    );
    setFilteredTodos(filtered); // 필터링된 데이터 업데이트
  }, 300);
  

  // Todo 수정 Mutation
  const updateTodoMutation = useMutation({
    mutationFn: async (updatedTodo) => {
      // 여기서 updatedTodo 객체를 console.log로 확인해 보세요.
      console.log("업데이트 요청 데이터:", updatedTodo);

      // 서버로 보낼 데이터에서 불필요한 필드를 제거해야 합니다.
      const { id, title, content } = updatedTodo; // 필요한 필드만 가져옵니다.

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }), // 필요한 필드만 서버에 보냅니다.
      });

      const contentType = response.headers.get("Content-Type");
      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Todo 업데이트 실패: ${responseText}`);
      }

      if (contentType && contentType.includes("application/json")) {
        return JSON.parse(responseText);
      } else {
        return updatedTodo; // 반환 데이터가 없으면 원래 업데이트된 데이터를 반환
      }
    },
    onSuccess: (updatedTodo) => {
      console.log("수정된 데이터:", updatedTodo);

      // 로컬 스토리지 업데이트
      const savedTodos = JSON.parse(localStorage.getItem("할일들")) || [];
      const updatedTodos = savedTodos.map((item) =>
        item.id === parseInt(id, 10) ? { ...item, ...updatedTodo } : item
      );

      // 로컬 스토리지에 업데이트된 할일들 저장
      localStorage.setItem("할일들", JSON.stringify(updatedTodos));
      setTodos(updatedTodos);

      // 상태 업데이트 (수정된 제목과 내용으로 업데이트)
      setTodo({ ...todo, ...updatedTodo });

      queryClient.invalidateQueries(["todos"]); // Todos 캐시 무효화
      alert("성공적으로 저장되었습니다.");
      setIsEditing(false); // 수정 모드 종료
    },
    onError: (error) => {
      alert(`업데이트 실패: ${error.message}`);
    },
  });

  const handleUpdate = () => {
    if (!updatedTitle.trim() || !updatedContent.trim()) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    const updatedTodo = {
      ...todo,
      title: updatedTitle,
      content: updatedContent,
    };

    updateTodoMutation.mutate(updatedTodo); // Todo 수정 Mutation 호출
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // 로컬 스토리지에서 삭제
      const savedTodos = JSON.parse(localStorage.getItem("할일들")) || [];
      const updatedTodos = savedTodos.filter((item) => item.id !== parseInt(id, 10));
      localStorage.setItem("할일들", JSON.stringify(updatedTodos));
      setTodos(updatedTodos);

      queryClient.invalidateQueries(["todos"]); // Todos 캐시 무효화
      navigate("/"); // 목록 페이지로 이동
      window.location.reload();
    }
  };

  if (!todo) {
    return (
      <s.ErrorMessage>
        할 일을 찾을 수 없습니다.
        <Button onClick={() => navigate(-1)}>뒤로 가기</Button>
      </s.ErrorMessage>
    );
  }

  return (
    <s.DetailContainer>
      <h2>할 일 상세 보기</h2>

      {/* 검색창 */}
      <input
        type="text"
        placeholder="할 일 검색"
        value={searchTitle}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <ul>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((item) => (
            <li key={item.id || `todo-${item.title}-${item.content}`}>
              {item.title ? (
                <Button onClick={() => navigate(`/todo/${item.id}`)}>
                  {item.title}
                </Button>
              ) : (
                <p>할 일 제목이 없습니다.</p>
              )}
            </li>
          ))
        ) : (
          <p>검색된 할 일이 없습니다.</p>
        )}
      </ul>

      <hr />

      {!isEditing ? (
        <>
          <s.TextContainer>
            <p>
              <strong>제목:</strong> {todo.title}
            </p>
            <p>
              <strong>내용:</strong> {todo.content}
            </p>
          </s.TextContainer>
          <s.ButtonContainer>
            <Button onClick={() => setIsEditing(true)}>수정</Button>
            <Button onClick={handleDelete}>삭제</Button>
            <Button onClick={() => navigate(-1)}>뒤로 가기</Button>
          </s.ButtonContainer>
          <h3>다른 할 일 보기</h3>
          <ul>
            {todos
              .filter(
                (item) =>
                  item.id !== parseInt(id, 10) && // 현재 Todo 제외
                  item.title && item.content && // 제목과 내용이 정의되어 있는 경우
                  item.title.trim() !== "" && // 제목이 빈 값이 아닌 경우
                  item.content.trim() !== "" // 내용이 빈 값이 아닌 경우
              )
              .map((item) => (
                <li key={item.id}>
                  <Button onClick={() => navigate(`/todo/${item.id}`)}>
                    {item.title}
                  </Button>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <s.EditForm>
          <input
            type="text"
            placeholder="제목 수정"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            placeholder="내용 수정"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <s.ButtonContainer>
            <Button onClick={handleUpdate}>저장</Button>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
          </s.ButtonContainer>
        </s.EditForm>
      )}
    </s.DetailContainer>
  );
};

export default TodoDetail;
