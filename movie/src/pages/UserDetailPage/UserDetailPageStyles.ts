import styled from 'styled-components';

export const UserDetailContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

export const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const ProfileAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
`;

export const Username = styled.h2`
  font-size: 1.8em;
  margin: 0;
  color: #333;
`;

export const ProfileDetails = styled.div`
  padding: 10px;
  line-height: 1.6;
`;

export const DetailItem = styled.p`
  font-size: 1em;
  color: #555;

  strong {
    color: #222;
  }
`;
