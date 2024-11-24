import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail/TodoDetail";
import { TodoProvider } from "./components/TodoContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

export const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // 필요한 설정 추가
        retry: 1, // 실패 시 1회 재시도
      },
    },
  });

  return (
      <TodoProvider>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Navigate to="/todo" replace />} /> 
              <Route path="/todo" element={<TodoList />} />
              <Route path="/todo/:id" element={<TodoDetail />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
    </QueryClientProvider>
      </TodoProvider>
  );
};

export default App;
