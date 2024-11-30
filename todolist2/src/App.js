// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetail';
import InputTodo from './components/InputTodo';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <InputTodo />
                <TodoList />
              </>
            }
          />
          <Route path="/todo/:id" element={<TodoDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
