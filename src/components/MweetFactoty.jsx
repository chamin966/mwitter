import React, { useState } from 'react';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; //랜덤으로 유니크한 아이디를 주기위해 사용, npm install uuid 필요
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { dbService, storageService } from 'fbase';

//Mweet의 생성을 담당
const MweetFactory = ({ userObj }) => {
  const [mweet, setMweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';

    if (attachment !== '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, attachment, 'data_url');
      //'data_url'은 포맷정보임
      attachmentUrl = await getDownloadURL(response.ref);
      //getDownloadURL()은 레퍼런스 객체를 인수로 받으며 response의 레퍼런스 객체가 reponse.ref에 있다.
    }

    const mweetObj = {
      text: mweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await addDoc(collection(dbService, 'mweetsInDb'), mweetObj);
    setMweet('');
    setAttachment('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      //FileReader()의 이벤트 핸들러인 onloadend로
      //이벤트가 끝날 때까지 기다렸다가, 받아낸 finishedEvent 내부에 있는
      //currentTarget 내부의 result에 있는 값을 result라는 같은 이름의 변수에 할당함
      //result는 이미지 파일의 경로와 브라우저에서 텍스트를 이미지로 변환시킬 수 있는 url값을 가진다.
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAttachment(result);
    };

    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={mweet} type='text' placeholder="What's on your mind?" maxLength={120} />
      <input type='file' accept='image/*' onChange={onFileChange} />
      <input type='submit' value='Mweet' />
      {attachment && (
        <div>
          <img src={attachment} alt='프로필 이미지' width='50px' height='50px' />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default MweetFactory;
