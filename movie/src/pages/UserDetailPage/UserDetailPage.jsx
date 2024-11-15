import React, { useEffect, useState } from 'react';
import { fetchCurrentUserInfo } from '../../api/userApi';
import {
  UserDetailContainer,
  ProfileHeader,
  ProfileAvatar,
  Username,
  ProfileDetails,
  DetailItem,
} from './UserDetailPageStyles';

const UserDetailPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const data = await fetchCurrentUserInfo();
        setUserInfo(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadUserInfo();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!userInfo) return <div>Loading...</div>;

  return (
    <UserDetailContainer>
      <ProfileHeader>
        <ProfileAvatar
        />
        <Username>{userInfo.username}</Username>
      </ProfileHeader>
      <ProfileDetails>
        <DetailItem><strong>Email:</strong> {userInfo.username || "N/A"}</DetailItem>
        <DetailItem><strong>Country:</strong> {userInfo.iso_3166_1}</DetailItem>
        <DetailItem><strong>Language:</strong> {userInfo.iso_639_1}</DetailItem>
        <DetailItem><strong>Include Adult Content:</strong> {userInfo.include_adult ? 'Yes' : 'No'}</DetailItem>
      </ProfileDetails>
    </UserDetailContainer>
  );
};

export default UserDetailPage;
