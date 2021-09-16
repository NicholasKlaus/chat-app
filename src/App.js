import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyAob46dRhwy8NDCyM0pJSLSSpUa3Yjq6Ro",
  authDomain: "chat-app-f57b2.firebaseapp.com",
  projectId: "chat-app-f57b2",
  storageBucket: "chat-app-f57b2.appspot.com",
  messagingSenderId: "787039596148",
  appId: "1:787039596148:web:7a76688d2378d09c72eb21"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Chat App</h1>
          <SignOut />
        </header>

        <section>
          {
            user ? <Chat /> : <SignIn />
          }
        </section>
      </div>
    </div>
  );
}

export default App;


//=========================================C O M P O N E N T S ==========================================================================

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <div>
      <button
        onClick={signInWithGoogle}      
      >Sign in with Google</button>
    </div>
  );
}

const SignOut = () => {
  return auth.currentUser && (
    <div>
      <button
        onClick={() => auth.signOut()}
      >Sign out</button>
    </div>
  )
}

const Chat = () => {
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

const ChatMessage = (props) => {
  const {text, uid, photoURL} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return(
    <div className={`message ${messageClass}`}>
      <img src={photoURL} /> 
      <p>
        {text}
      </p>
    </div>
  );
}