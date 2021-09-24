import React from "react";
import { auth } from "../firebase/firebase";

export const ChatMessage = (props) => {
  const {text, uid, photoURL} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return(
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="UserPhoto" /> 
      <p>
        {text}
      </p>
    </div>
  );
}