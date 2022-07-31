import { dbService } from 'fbase';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Mweet from 'components/Mweet';

const Home = ({ userObj }) => {
  const [mweet, setMweet] = useState('');
  const [mweets, setMweets] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, 'mweetsInDb'), orderBy('createdAt', 'desc'));

    onSnapshot(q, (qSnapshot) => {
      //foreach문보다 re-render가 적기 때문에 더 좋은 코드임
      const mweetsArrays = qSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMweets(mweetsArrays);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    //addDoc()의 파라미터로 (콜렉션레퍼런스 인스턴스와 object 객체가 넘어가야 함)
    await addDoc(collection(dbService, 'mweetsInDb'), {
      text: mweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
    });
    setMweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMweet(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={mweet} type='text' placeholder="What's on your mind?" maxLength={120} />
        <input type='submit' value='Mweet' />
      </form>
      <div>
        {mweets.map((mweet) => (
          <Mweet key={mweet.id} mweetObj={mweet} isOwner={mweet.creatorId === userObj.uid} />
        ))}
      </div>
    </>
  );
};
export default Home;
