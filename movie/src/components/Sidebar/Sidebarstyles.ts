import styled from 'styled-components';

export const StyledSidebar = styled.aside`
  width: 210px;
  position: fixed;
  top: 170px;
  left: -210px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #575550;
  transition: left 0.3s ease;
  z-index: 1000;

  &.visible {
    left: 0;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 130px;
`;

export const SearchButton = styled.button`
  margin: 10px 0;
  padding: 10px;
  width: 150px;
  cursor: pointer;
`;

export const SearchBox = styled.div`
  margin-top: 10px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 0.2px ridge #4f4e4e;
  background-color: #575555;
  border-radius: 4px;
  color: white;
`;

export const SearchResults = styled.div`
  font-size: 0.9em;
  width: 270px;
  color: #647b7d;
`;

export const MovieContainer = styled.div`
  position: relative;
  width: 150px;
`;

export const MovieButton = styled.button`
  background: grey;
  border: 0.5px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  width: 100%;
`;

export const MovieDropdown = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
  background-color: #373030;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 1px;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.3s ease, opacity 0.3s ease;

  ${MovieContainer}:hover & {
    max-height: 130px;
    opacity: 1;
  }
`;

export const DropdownButton = styled.button`
  padding: 5px;
  text-align: left;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;

  &:hover {
    background-color: #e0e0e0;
  }
`;
