import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMovieDropdownOpen, setIsMovieDropdownOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      navigate('/search'); 
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleMovieDropdown = () => {
    setIsMovieDropdownOpen(true);
  };

  const closeMovieDropdown = () => {
    setIsMovieDropdownOpen(false);
  };

  return (
    <aside 
      className={`sidebar ${isVisible ? 'visible' : ''}`} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="search-container">
        <button className="search-btn" onClick={toggleSearch}>🔎 검색</button>
        {isSearchOpen && (
          <div className="search-box">
            <input 
              type="text" 
              placeholder="검색어 입력..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="search-results">
              {searchQuery && <p>검색어: {searchQuery}</p>}
            </div>
          </div>
        )}
      </div>

      <div 
        className="movie-container" 
        onMouseEnter={toggleMovieDropdown}
        onMouseLeave={closeMovieDropdown}
      >
        <button className="movie-btn">🎬 영화</button>
        {isMovieDropdownOpen && (
          <div className="movie-dropdown">
            <Link to="/recommended"><button>추천 영화</button></Link>
            <Link to="/latest"><button>최신 영화</button></Link>
            <Link to="/theater"><button>극장판</button></Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
