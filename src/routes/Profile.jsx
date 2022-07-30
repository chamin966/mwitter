import React from 'react';
import authService from 'fbase'; //계정에 관련된 내용은 여기서 가져와야함. 그냥 메서드만 달랑 가져오면 안됨
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
