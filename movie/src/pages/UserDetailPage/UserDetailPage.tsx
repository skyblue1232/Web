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

interface UserDetailPageProps {
  accountId: number | null; // accountId 타입 추가
}

// 사용자 정보 타입 정의
interface UserInfo {
  username: string;
  iso_3166_1: string;
  iso_639_1: string;
  include_adult: boolean;
}

const UserDetailPage: React.FC<UserDetailPageProps> = ({ accountId }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const data: UserInfo = await fetchCurrentUserInfo();
        setUserInfo(data);
      } catch (err) {
        setError((err as Error).message || "Failed to fetch user data");
      }
    };
    loadUserInfo();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!userInfo) return <div>Loading...</div>;

  return (
    <UserDetailContainer>
      <ProfileHeader>
        <ProfileAvatar />
        <Username>{userInfo.username}</Username>
      </ProfileHeader>
      <ProfileDetails>
        <DetailItem>
          <strong>Email:</strong> {userInfo.username || "N/A"}
        </DetailItem>
        <DetailItem>
          <strong>Country:</strong> {userInfo.iso_3166_1 || "N/A"}
        </DetailItem>
        <DetailItem>
          <strong>Language:</strong> {userInfo.iso_639_1 || "N/A"}
        </DetailItem>
        <DetailItem>
          <strong>Include Adult Content:</strong> {userInfo.include_adult ? 'Yes' : 'No'}
        </DetailItem>
      </ProfileDetails>
    </UserDetailContainer>
  );
};

export default UserDetailPage;
