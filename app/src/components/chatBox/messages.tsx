import React from 'react';
import Message from './message';
import './messages.css';

interface props {
  messages: any;
  userName: string;
  selectedWord: string;
}
const Messages = ({ messages, userName, selectedWord }: props) => {
  return (
    <div className="container">
      <div>
        {messages.map((message: any, i: string | number | undefined) => (
          <div key={i}>
            <Message
              message={message}
              userName={userName}
              selectedWord={selectedWord}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
