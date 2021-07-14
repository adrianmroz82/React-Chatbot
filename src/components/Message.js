import './Message.css';
import { useEffect, useRef } from 'react';

const Message = (props) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className="messages">
      {props.msgList.map((msg, index) => {
        return (
          <div
            key={index}
            className={`chatting-window ${msg.isBot ? 'bot' : 'client'}`}
          >
            <p className="text-sent pl-10">
              <i className={`fas ${msg.isBot ? 'fa-robot' : 'fa-user'}`} />
            </p>
            <div
              className={`message-container ${
                msg.isBot ? 'bot-background' : 'client-background'
              }`}
            >
              <p
                className={`message-text ${
                  msg.isBot ? 'black-color' : 'white-color'
                }`}
              >
                {msg.content}
              </p>
              {msg.flag && <img className="flag" alt="flag" src={msg.flag} />}
              <p>{msg.time.toLocaleTimeString()}</p>
            </div>
          </div>
        );
      })}
      <div style={{ float: 'left', clear: 'both' }} ref={messagesEndRef}></div>
    </div>
  );
};

export default Message;
