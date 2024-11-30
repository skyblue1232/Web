import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API base URL
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Async Thunks
export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.slice(0, 10); // First 10 todos
});

export const addTodoAPI = createAsyncThunk('todo/addTodo', async (todo) => {
  const mockResponse = {
    ...todo,
    id: new Date().getTime(), // Mock ID generation
  };
  return mockResponse;
});

export const updateTodoAPI = createAsyncThunk('todo/updateTodo', async (todo) => {
  return { ...todo }; // Directly return updated data
});

export const deleteTodoAPI = createAsyncThunk('todo/deleteTodo', async (id) => {
  return id; // Directly return the ID for deletion
});

// Slice
const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    resetTodos: (state) => {
      state.todos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      // Add Todo
      .addCase(addTodoAPI.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      // Update Todo
      .addCase(updateTodoAPI.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index >= 0) state.todos[index] = action.payload;
      })
      // Delete Todo
      .addCase(deleteTodoAPI.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export const { resetTodos } = todoSlice.actions;
export default todoSlice.reducer;
