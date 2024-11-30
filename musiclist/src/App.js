import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import styled from 'styled-components';
import Modal from './components/Modal';

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Modal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
`;
