import React, { useState, useCallback, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Input from "./Input";
import Button from "./Button";
import { useTodoContext } from "./TodoContext";
import { useNavigate } from "react-router-dom";
import * as s from "./TodoListStyles";

const TodoList = () => {
  const navigate = useNavigate();
  const {
    할일들,
    제목값,
    제목값변경,
    내용값,
    내용값변경,
    // 할일추가,
    선택된항목,
    선택된항목변경,
    set할일들,
    loading,
    할일삭제, 
    선택된항목삭제,
  } = useTodoContext();

  const 할일추가 = () => {
    const newTodo = {
      id: Date.now(),
      title: 제목값,
      content: 내용값,
      checked: false,
    };
    set할일들((prevTodos) => [...prevTodos, newTodo]);
  };

  const [수정중인아이디, set수정중인아이디] = useState(null);
  const [수정제목값, set수정제목값] = useState("");
  const [수정내용값, set수정내용값] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("게시글을 불러오는 중입니다");
  const [hasError, setHasError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [titleError, setTitleError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [contentError, setContentError] = useState(false);


  // 로딩 애니메이션 효과
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingText((prev) =>
          prev === "게시글을 불러오는 중입니다..."
            ? "게시글을 불러오는 중입니다"
            : prev + "."
        );
      }, 500); // 점 애니메이션 간격

      // 3초 지연 후 로딩 완료
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isLoading]);

  const mutation = useMutation({
    mutationFn: async (updatedTodo) => {
      console.log("PATCH 요청 데이터:", updatedTodo);
  
      // 서버 URL 확인 
      const response = await fetch(`http://localhost:3000/todo/${updatedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTodo.title,
          content: updatedTodo.content,
          checked: updatedTodo.checked,
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text(); 
        throw new Error(`서버 오류: ${errorMessage}`);
      }
  
      return response.text();
    },
    onSuccess: (responseData) => {
      console.log("서버 응답 성공:", responseData);
  
      const updatedTodos = 할일들.map((할일) =>
        할일.id === responseData.id ? responseData : 할일
      );
      set할일들(updatedTodos.id);
  
      set수정중인아이디(null);
      set수정제목값("");
      set수정내용값("");
    },
    onError: (error) => {
      console.error("업데이트 실패:", error.message);
      alert(`업데이트 실패: ${error.message}`);
    },
  });  
  
  // 선택 상태 토글 함수
  const toggleSelect = useCallback((id) => {
    선택된항목변경((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, [선택된항목변경]);

  // 수정 시작 함수
  const handleEditStart = (할일) => {
    set수정중인아이디(할일.id);
    set수정제목값(할일.title);
    set수정내용값(할일.content);
  };

  const handleEditComplete = () => {
    const updatedTodo = {
      id: 수정중인아이디,
      title: 수정제목값,
      content: 수정내용값,
      checked: false,
    };
  
    console.log("업데이트 요청 데이터:", updatedTodo);
  
    mutation.mutate(updatedTodo, {
      onSuccess: (responseData) => {
        console.log("서버 응답 성공:", responseData);
  
        // 상태 갱신
        const updatedTodos = 할일들.map((할일) =>
          할일.id === updatedTodo.id ? { ...할일, ...updatedTodo } : 할일
        );
  
        set할일들(updatedTodos);
  
        // 상태 초기화
        set수정중인아이디(null);
        set수정제목값("");
        set수정내용값("");
      },
      onError: (error) => {
        console.error("업데이트 실패:", error.message);
        alert(`업데이트 실패: ${error.message}`);
      },
    });
  };  

  // 수정 취소 함수
  const handleEditCancel = () => {
    set수정중인아이디(null);
    set수정제목값("");
    set수정내용값("");
  };

  const handleDetailView = (id) => {
    navigate(`/todo/${id}`); // 상세 페이지로 이동
  };

  const handleAddTodo = () => {
    // 제목과 내용 검증
    const isTitleEmpty = !제목값.trim();
    const isContentEmpty = !내용값.trim();

    setTitleError(isTitleEmpty);
    setContentError(isContentEmpty);
  
    if (isTitleEmpty || isContentEmpty) {
      setHasError(true); // 에러 상태 활성화
      setTimeout(() => setHasError(false), 1000); // 2초 후 에러 상태 해제
    } else {
      할일추가(); // 제목과 내용이 유효할 경우 할 일 추가
    }
  };

  return (
    <s.TodoContainer>
      <h1>할 일 목록</h1>
      {hasError && (
        <s.ErrorOverlay>
          <div className="error-text">X</div>
        </s.ErrorOverlay>
      )}
      {isLoading ? (
        <s.LoadingContainer>
          <p>{loadingText}</p>
          <s.LoadingSpinner>
            <s.LoadingDot />
            <s.LoadingDot />
            <s.LoadingDot />
          </s.LoadingSpinner>
          <s.LoadingDot />
          <s.LoadingDot />
        </s.LoadingContainer>
      ) : (
      <>
        <s.InputContainer>
          <Input
            value={제목값}
            onChange={(e) => {
              제목값변경(e.target.value);
              if (e.target.value.trim()) setTitleError(false); // 에러 해제
            }}
            placeholder="제목을 입력하세요"
          />

          <Input
            value={내용값}
            onChange={(e) => {
              내용값변경(e.target.value);
              if (e.target.value.trim()) setContentError(false); // 에러 해제
            }}
            placeholder="내용을 입력하세요"
          />
          <Button onClick={handleAddTodo}>할 일 등록</Button>
        </s.InputContainer>

        {loading && <p>로딩 중...</p>}
        {!loading && 할일들.length === 1 && <p>현재 등록된 할 일이 없습니다.</p>}

        {!loading && 할일들.length > 0 && (
          <s.TodoListContainer>
            {할일들
              .filter((할일) => 할일.title && 할일.content && 할일.title.trim() !== "" && 할일.content.trim() !== "")
              .map((할일, index) => (
              <s.TodoItem key={할일.id || index}>
                <s.TodoLeft>
                  <s.Checkbox
                    type="checkbox"
                    checked={선택된항목.has(할일.id)}
                    onChange={() => toggleSelect(할일.id)}
                  />
                  {수정중인아이디 === 할일.id ? (
                    <>
                      <Input
                        value={수정제목값}
                        onChange={(e) => set수정제목값(e.target.value)}
                        placeholder="제목 수정"
                      />
                      <Input
                        value={수정내용값}
                        onChange={(e) => set수정내용값(e.target.value)}
                        placeholder="내용 수정"
                      />
                    </>
                  ) : (
                    <>
                      <span className="titleWrapper">{할일.title}</span>
                      <p className="contentWrapper">{할일.content}</p>
                    </>
                  )}
                </s.TodoLeft>
                <s.ButtonGroup>
                <Button onClick={() => handleDetailView(할일.id)}>상세 보기</Button>
                  {수정중인아이디 === 할일.id ? (
                    <>
                      <Button onClick={handleEditComplete}>완료</Button>
                      <Button onClick={handleEditCancel}>취소</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleEditStart(할일)}>수정</Button>
                      <Button onClick={() => 할일삭제(할일.id)}>삭제</Button>
                    </>
                  )}
                </s.ButtonGroup>
              </s.TodoItem>        
            ))}
          </s.TodoListContainer>
        )}
        <s.DeleteButton>
          <Button onClick={선택된항목삭제}>선택 삭제</Button>
        </s.DeleteButton>
      </>
      )}
    </s.TodoContainer>
  );
};

export default TodoList;
