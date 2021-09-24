import React, { useRef, useState } from "react";
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore} from '../firebase/firebase';
import { ChatMessage } from './ChatMessage';

export const Chat = () => {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField : 'id'});
  const [formVal, setFormVal] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await messagesRef.add({
      text: formVal,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
    setFormVal('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return(
    <div className="chat">
      <main>
        {
          messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)
        }
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>  
        <input value={formVal} onChange={(e) => setFormVal(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}