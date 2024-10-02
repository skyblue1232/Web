import React from 'react';
import MovieList from './MovieList';
import './App.css';

function App() {
  return (
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <img src="/umc_logo.png" className="logo" alt="UMC Logo" />
            <div className="text-content">
              <h1 className="title">
                <span className="underline">영화는 영화관에서</span>
              </h1>
              <p className="subtitle">Umc에서 여는 가짜 영화관</p>
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
      
      <main>
        <MovieList />
      </main>
      
      <footer className="app-footer">
        <p>© 2024 영화는 영화관에서 | 모든 권한이 umc에는 없습니다.</p>
      </footer>
    </div>
  );
}

export default App;
