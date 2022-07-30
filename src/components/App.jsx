import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import authService from '../fbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true); //상태에 변화가 생겼다는 것이 firebase가 초기화 되었음을 의미
    });
  }, []);
  //XML 사용하려면 프레그먼트와 같은 부모태그 반드시 필요!!
  return <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initialization...'}</>;
}

export default App;
