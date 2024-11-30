import React from 'react';
import styled from 'styled-components';
import useCartStore from '../features/cartSlice';

const SearchBar = () => {
  const { searchQuery, updateSearchQuery, applySearch } = useCartStore();

  const handleInputChange = (e) => {
    updateSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      applySearch();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={searchQuery}
        placeholder="Search by title, singer, or price"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </SearchContainer>
  );
};

export default SearchBar;

const SearchContainer = styled.div`
  flex-grow: 1;
  margin: 0 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
`;
