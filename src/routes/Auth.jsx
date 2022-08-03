import React from 'react';
import { authService } from 'fbase';
//파이어베이스 레퍼런스에서 Overview에 다 있다.
//파라미터 auth에 fbase.jsx 에서 만들어 놓은 authService가 들어가므로 메서드만 불러와도 됨.
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import AuthForm from 'components/AuthForm';

const Auth = () => {
  const onSocialClick = async (event) => {
    // console.log(event.target.name); //확인용
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(authService, provider);
    console.log(result);
  };

  return (
    <>
      <AuthForm />
      <button name='google' onClick={onSocialClick}>
        Continue with Google
      </button>
    </>
  );
};
export default Auth;
