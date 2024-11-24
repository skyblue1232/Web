import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TodoContext = createContext(null); // 기본값을 명시적으로 null로 설정

export const TodoProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const [할일들, set할일들] = useState(() => {
    // 로컬 스토리지에서 데이터 복원
    const savedTodos = localStorage.getItem("할일들");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [제목값, 제목값변경] = useState("");
  const [내용값, 내용값변경] = useState("");
  const [선택된항목, 선택된항목변경] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //데이터 저장
  useEffect(() => {
    localStorage.setItem("할일들", JSON.stringify(할일들));
  }, [할일들]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("할일들");
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      if (parsedTodos.length > 0) {
        console.log("가져온 데이터:", parsedTodos);
      } else {
        console.log("저장된 데이터가 없습니다.");
      }
    } else {
      console.log("저장된 데이터가 없습니다.");
    }
  }, []);

  // 할 일 목록 불러오기
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/todo");
      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }
      const data = await response.json();
      set할일들((prev) => {
        const existingIds = new Set(prev.map((todo) => todo.id));
  
        // 새 데이터 중 기존 상태에 없는 항목만 추가
        const newTodos = data.filter((todo) => {
          // 여기서 초기 상태 데이터의 조건 추가 (예: ID가 null이거나 특정 값인 경우)
          if (!todo.id || todo.title === "초기 데이터 제목") return false;
          return !existingIds.has(todo.id);
        });
  
        return [...prev, ...newTodos];
      });
    } catch (err) {
      console.error("할 일 목록 불러오기 실패:", err.message);
      setError("할 일 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 할 일 추가하기
  const 할일추가 = async () => {
    if (!제목값.trim() || !내용값.trim()) {
      alert("제목과 내용을 모두 입력하세요!");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const newTodo = {
        title: 제목값,
        content: 내용값,
      };
      console.log("전송 데이터:", newTodo); 

      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("서버 응답 데이터:", responseData); 

      set할일들((prev) => [...prev, responseData]); 

      제목값변경(""); // 제목 입력 필드 초기화
      내용값변경(""); // 내용 입력 필드 초기화
    } catch (err) {
      console.error("할 일 추가 실패:", err.message);
      setError("할 일 추가 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };
  

  // 개별 할 일 삭제 Mutation 생성
  const deleteTodoMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      console.log(`할 일 삭제 성공: ID = ${id}, 상태 코드 = ${response.status}`);
      return id; // 성공한 경우 삭제된 ID 반환
    },
    onSuccess: (id) => {
      // 상태 업데이트 및 로컬 스토리지 반영
      set할일들((prev) => {
        const updatedTodos = prev.filter((todo) => todo.id !== id);
        localStorage.setItem("할일들", JSON.stringify(updatedTodos));
        return updatedTodos;
      });

      // queryClient를 사용해 캐시 무효화
      queryClient.invalidateQueries("todos");
    },
    onError: (error) => {
      console.error("할 일 삭제 실패:", error.message);
      alert(`할 일 삭제 중 문제가 발생했습니다: ${error.message}`);
    },
  });

  // 선택된 항목 삭제 Mutation 생성
  const deleteSelectedTodosMutation = useMutation({
    mutationFn: async (ids) => {
      const deleteRequests = ids.map((id) =>
        fetch(`http://localhost:3000/todo/${id}`, { method: "DELETE" })
      );

      const responses = await Promise.all(deleteRequests);

      // 응답 확인
      responses.forEach((response, index) => {
        const id = ids[index];
        if (!response.ok) {
          throw new Error(`항목 삭제 실패: ID = ${id}, 상태 코드 = ${response.status}`);
        }
        console.log(`항목 삭제 성공: ID = ${id}, 상태 코드 = ${response.status}`);
      });

      return ids; // 삭제된 ID 목록 반환
    },
    onSuccess: (deletedIds) => {
      set할일들((prev) => {
        const updatedTodos = prev.filter((todo) => !deletedIds.includes(todo.id));
        localStorage.setItem("할일들", JSON.stringify(updatedTodos));
        return updatedTodos;
      });

      선택된항목변경(new Set()); // 선택 항목 초기화

      // queryClient를 사용해 캐시 무효화
      queryClient.invalidateQueries("todos");
    },
    onError: (error) => {
      console.error("선택된 항목 삭제 실패:", error.message);
      alert(`선택된 항목 삭제 중 문제가 발생했습니다: ${error.message}`);
    },
  });

  const 할일삭제 = (id) => {
    if (!id) {
      alert("삭제할 항목의 ID를 찾을 수 없습니다.");
      return;
    }
    deleteTodoMutation.mutate(id); // Mutation 호출
  };

  const 선택된항목삭제 = () => {
    if (선택된항목.size === 0) {
      alert("삭제할 항목을 선택하세요!");
      return;
    }
    deleteSelectedTodosMutation.mutate(Array.from(선택된항목)); // Mutation 호출
  };


  useEffect(() => {
      fetchTodos(); // 데이터를 가져오기
  }, []);

  return (
    <TodoContext.Provider
      value={{
        할일들,
        set할일들,
        내용값,
        제목값, 
        제목값변경,
        내용값변경,
        할일추가,
        할일삭제,
        선택된항목,
        선택된항목변경,
        선택된항목삭제,
        loading,
        error,
      }} 
    >
      {children}
    </TodoContext.Provider>
  );
};

// 컨텍스트 사용을 위한 커스텀 훅
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext는 TodoProvider 내부에서 사용해야 합니다.");
  }
  return context;
};

