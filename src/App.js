import React from 'react';
import { auth } from './firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  SignIn,
  SignOut,
  Chat
} from './components/index';

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