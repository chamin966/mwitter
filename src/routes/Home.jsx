import { dbService } from 'fbase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Mweet from 'components/Mweet';
import MweetFactory from 'components/MweetFactoty';

const Home = ({ userObj }) => {
  const [mweets, setMweets] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, 'mweetsInDb'), orderBy('createdAt', 'desc'));

    onSnapshot(q, (qSnapshot) => {
      //foreach문보다 re-render가 적기 때문에 더 좋은 코드임
      const mweetsArrays = qSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMweets(mweetsArrays);
    });
  }, []);

  return (
    <>
      <MweetFactory userObj={userObj} />
      <div>
        {mweets.map((mweet) => (
          <Mweet key={mweet.id} mweetObj={mweet} isOwner={mweet.creatorId === userObj.uid} />
        ))}
      </div>
    </>
  );
};
export default Home;
