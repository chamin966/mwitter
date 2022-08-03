import Mweet from 'components/Mweet';
import { authService, dbService } from 'fbase'; //계정에 관련된 내용은 여기서 가져와야함. 그냥 메서드만 달랑 가져오면 안됨
import { updateProfile } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ refreshUser, userObj }) => {
  const [myMweets, setMyMweets] = useState([]);
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.DisplayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  useEffect(() => {
    const getMyMweets = () => {
      //v8에서 .get()이 v9에서 query()의 기능중 하나로 흡수됨
      const q = query(
        collection(dbService, 'mweetsInDb'),
        where('creatorId', '==', userObj.uid),
        orderBy('createdAt', 'desc')
      );
      onSnapshot(q, (qSnapshot) => {
        const myMweetsArray = qSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        //id를 안주면 나중에 map으로 풀 수가 없음.
        setMyMweets(myMweetsArray);
      });
    };
    getMyMweets();
  });

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.DisplayName !== newDisplayName) {
      //이름이 이전과 같지 않다면
      await updateProfile(userObj, { displayName: newDisplayName }); //새로운 이름으로 userObj의  displayName 속성을 바꾼다.
      refreshUser(); //재렌더링을 위한 App의 함수 호출
      setNewDisplayName(''); //다시 수정창 비우기
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type='text' placeholder='Display name' value={newDisplayName} />
        <input type='submit' value='Update Profile' />
      </form>
      <div>
        <span>myMweets</span>
        {myMweets.map((myMweet) => (
          <Mweet key={myMweet.id} mweetObj={myMweet} isOwner={myMweet.creatorId === userObj.uid} />
        ))}
      </div>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
