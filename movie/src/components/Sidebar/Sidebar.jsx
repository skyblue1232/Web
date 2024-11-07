import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './Sidebarstyles';

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMovieDropdownOpen, setIsMovieDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery(''); // 검색어 초기화
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Enter 키로 검색어 제출하여 /search 페이지로 이동
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const toggleMovieDropdown = () => setIsMovieDropdownOpen(true);
  const closeMovieDropdown = () => setIsMovieDropdownOpen(false);
  const goToCategory = () => navigate("/category");

  return (
    <S.StyledSidebar 
      className={isVisible ? 'visible' : ''} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <S.SearchContainer>
        <S.SearchButton onClick={toggleSearch}>🔎 검색</S.SearchButton>
        {isSearchOpen && (
          <S.SearchBox>
            <S.SearchInput 
              type="text" 
              placeholder="검색어 입력..." 
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress} // Enter 키 이벤트 추가
            />
          </S.SearchBox>
        )}
      </S.SearchContainer>

      <S.MovieContainer 
        onMouseEnter={toggleMovieDropdown}
        onMouseLeave={closeMovieDropdown}
      >
        <S.MovieButton onClick={goToCategory}>🎬 영화</S.MovieButton>
        {isMovieDropdownOpen && (
          <S.MovieDropdown>
            <Link to="/recommended"><S.DropdownButton>추천 영화</S.DropdownButton></Link>
            <Link to="/latest"><S.DropdownButton>최신 영화</S.DropdownButton></Link>
            <Link to="/theater"><S.DropdownButton>극장판</S.DropdownButton></Link>
          </S.MovieDropdown>
        )}
      </S.MovieContainer>
    </S.StyledSidebar>
  );
};

export default Sidebar;
