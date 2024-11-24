import styled from "styled-components";

export const DetailContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const TextContainer = styled.div`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;

  p {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.5;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;

  button {
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
  }

  textarea {
    resize: none;
    height: 100px;
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: red;

  button {
    margin-top: 20px;
  }
`;
