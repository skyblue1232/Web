import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* 화면 높이를 꽉 채우도록 설정 */
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f8ff; /* 연한 파란색 배경 */
    color: #333;
    line-height: 1.6;
    padding-bottom: 200px; /* Cart Summary와 Footer 높이 고려 */
  }

  #root {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export default GlobalStyle;
