import React from "react"; 
import { auth } from '../firebase/firebase';

export const SignOut = () => {
  return auth.currentUser && (
    <div>
      <button
        onClick={() => auth.signOut()}
      >Sign out</button>
    </div>
  )
}