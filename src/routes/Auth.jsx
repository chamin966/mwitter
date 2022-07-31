import { authService } from 'fbase';
import {
  //파이어베이스 레퍼런스에서 Overview에 다 있다.
  //파라미터 auth에 fbase.jsx 에서 만들어 놓은 authService가 들어가므로 메서드만 불러와도 됨.
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event; //받아온 이벤트 정보에서 속성명 target(변경이 일어난 부분의 이름과 내용)에 있는 배열 내부값을 name과 value에 가져온다
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    // console.log(event.target.name); //확인용
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(authService, provider);
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name='email' type='email' placeholder='Email' required value={email} onChange={onChange} />
        <input name='password' type='password' placeholder='Password' required value={password} onChange={onChange} />
        <input type='submit' value={newAccount ? 'Create Account' : 'Log In'} />
        <span>{error}</span>
      </form>
      <span onClick={toggleAccount}>{newAccount ? 'Sign in' : 'Create Account'}</span>
      <div>
        <button name='google' onClick={onSocialClick}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};
export default Auth;
