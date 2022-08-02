import { authService } from 'fbase';
import { updateCurrentUser } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import AppRouter from './Router';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true); //상태에 변화가 생겼다는 것이 firebase가 초기화 되었음을 의미
    });
  }, []);

  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser); //새로운 유저오브젝트로 업데이트
    setUserObj(authService.currentUser); //새 이름으로 재렌더링되도록 함
  };

  //XML 사용하려면 프레그먼트와 같은 부모태그 반드시 필요!!
  return <>{init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : 'Initialization...'}</>;
}

export default App;
