import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';  // Navbar 컴포넌트를 추가했다고 가정
// import Sidebar from './components/Sidebar';  // Sidebar 컴포넌트를 추가했다고 가정
import MovieList from './components/MovieList/MovieList';  // MovieList 컴포넌트 위치
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}

        <header className="app-header">
          <div className="header-content">
            <img src="/umc_logo.png" className="logo" alt="UMC Logo" />
            <div className="text-content">
              <h1 className="title">
                <span className="underline">YoungHwa</span>
              </h1>
              <p className="subtitle">Umc Movie</p>
            </div>
          </div>
        </header>
      
        <div className="header-container">
          <div className="info">
            <p>주최: umc</p>
            <p>모방: umc</p>
            <p>기획: umc</p>
          </div>
        </div>

        <hr className="divider" />
        
        <div className="content">
          {/* <Sidebar /> */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MovieList />} />
            </Routes>
          </main>
        </div>

        <footer className="app-footer">
          <p>© 2024 영화는 영화관에서 | 모든 권한이 umc에는 없습니다.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
