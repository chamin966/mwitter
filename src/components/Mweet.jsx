import React, { useState } from 'react';
import { dbService } from 'fbase';
import { updateDoc, deleteDoc, doc } from '../../node_modules/firebase/firestore';

const Mweet = ({ mweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newMweet, setNewMweet] = useState(mweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this mweet?');

    if (ok) {
      await deleteDoc(doc(dbService, `mweetsInDb/${mweetObj.id}`));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, `mweetsInDb/${mweetObj.id}`), { text: newMweet });

    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewMweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type='text' placeholder='Edit your mweet' value={newMweet} onChange={onChange} required />
            <input type='submit' value='Update Mweet' />
          </form>
        </>
      ) : (
        <>
          <h4>{mweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Mweet;
