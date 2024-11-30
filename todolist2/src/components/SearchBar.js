import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchQuery } from '../redux/todoSlice';
import styled from 'styled-components';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.todo.searchQuery);

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={searchQuery}
        placeholder="검색어를 입력하세요"
        onChange={(e) => dispatch(updateSearchQuery(e.target.value))}
      />
    </SearchContainer>
  );
};

export default SearchBar;

const SearchContainer = styled.div`
  margin: 20px 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;
