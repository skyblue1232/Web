import React, { useState, useEffect } from 'react';
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
import UserDetailPage from './pages/UserDetailPage/UserDetailPage';
import Recommend from './pages/Recommend/Recommend.jsx';
import WatchaDiscovery from './pages/WatchaDiscovery/WatchaDiscovery';
import KoreaMovies from './pages/KoreaMovies/KoreaMovies';
import AnimationMovies from './pages/AnimationMovies/AnimationMovies';
import AdultContent from './pages/AdultContent/AdultContent';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchCurrentUserInfo } from './api/userApi';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [isSignedUp, setIsSignedUp] = useState(false); // 회원가입 상태

  const [accountId, setAccountId] = useState(null);

  // 로그인 핸들러
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 회원가입 핸들러
  const handleSignup = () => {
    setIsSignedUp(true);
  };

  useEffect(() => {
    const loadUserId = async () => {
      if (isLoggedIn) {
        try {
          const userInfo = await fetchCurrentUserInfo(); 
          setAccountId(userInfo.id); 
        } catch (error) {
          console.error('Failed to fetch account ID:', error);
        }
      }
    };
  
    loadUserId();
  }, [isLoggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content-wrapper">
            <Sidebar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<MovieList Navigate to="recommend"/>} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/nowplaying" element={<Nowplaying />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/latestGood" element={<LatestGood />} />
                <Route path="/upcomming" element={<Upcomming />} />
                <Route path="/recommended" element={<RecommendedMovies />} />
                <Route path="/latest" element={<LatestMovies />} />
                <Route path="/theater" element={<TheaterMovies />} />
                <Route path="/search" element={<Search />} />
                <Route path="/recommend" element={<Recommend />} />
                <Route path="/watcha-discovery" element={<WatchaDiscovery />} />
                <Route path="/korea" element={<KoreaMovies />} />
                <Route path="/animation" element={<AnimationMovies />} />
                <Route
                  path="/account"
                  element={<UserDetailPage accountId={accountId} />}
                />

                <Route
                  path="/login"
                  element={
                    isLoggedIn ? <Navigate to="/" /> : <LoginModal onLogin={handleLogin} />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    isSignedUp ? <Navigate to="/login" /> : <SignupModal closeModal={handleSignup} />
                  }
                />
                <Route
                  path="/adult"
                  element={
                    isLoggedIn ? (
                      <AdultContent />
                    ) : (
                      <div>
                        <h2>성인 인증이 필요합니다.</h2>
                        <p>로그인하고 인증하기</p>
                        <button onClick={() => setIsLoggedIn(true)}>로그인</button>
                      </div>
                    )
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
    </QueryClientProvider>
  );
}

export default App;
