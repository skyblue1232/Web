import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';  
import Sidebar from './components/Sidebar/Sidebar'; 
import MovieList from './pages/MovieList/MovieList';  
import RecommendedMovies from './pages/Recommend/RecommendedMovies';
import LatestMovies from './components/LatestMovies/LatestMovies';
import TheaterMovies from './components/TheaterMovies/TheaterMovies';
import LoginModal from './pages/LoginModal';
import SignupModal from './pages/SignupModal';
import CategoryPage from './pages/Category/Category';
import Nowplaying from './pages/Nowplaying/Nowplaying';
import Popular from './pages/Popular/Popular';
import LatestGood from './pages/LatestGood/LatestGood';
import Upcomming from './pages/Upcomming/Upcomming';
import Search from './pages/Search/Search';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [isSignedUp, setIsSignedUp] = useState(false); // 회원가입 상태

  // 로그인 핸들러
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 회원가입 핸들러
  const handleSignup = () => {
    setIsSignedUp(true);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content-wrapper">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/nowplaying" element={<Nowplaying />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/latestGood" element={<LatestGood />} />
              <Route path="/upcomming" element={<Upcomming />} />
              <Route path="/recommended" element={<RecommendedMovies />} />
              <Route path="/latest" element={<LatestMovies />} />
              <Route path="/theater" element={<TheaterMovies />} />
              <Route path="/search" element={<Search />} />

              <Route
                path="/login"
                element={
                  isLoggedIn ? <Navigate to="/" /> : <LoginModal onLogin={handleLogin} />
                }
              />
              <Route
                path="/signup"
                element={
                  isSignedUp ? <Navigate to="/" /> : <SignupModal closeModal={handleSignup} />
                }
              />
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
