import { useEffect, useRef } from "react";
import "./Message.css";

export const Message = ({ msgList }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className="messages">
      {msgList.map(({ isBot, content, flag, time }, index) => {
        return (
          <div key={index} className={`chatting-window ${isBot ? "bot" : "client"}`}>
            <p className="text-sent pl-10">
              <i className={`fas ${isBot ? "fa-robot" : "fa-user"}`} />
            </p>
            <div className={`message-container ${isBot ? "bot-background" : "client-background"}`}>
              <p className={`message-text ${isBot ? "black-color" : "white-color"}`}>{content}</p>
              {flag && <img className="flag" alt="flag" src={flag} />}
              <p>{time.toLocaleTimeString()}</p>
            </div>
          </div>
        );
      })}
      <div style={{ float: "left", clear: "both" }} ref={messagesEndRef}></div>
    </div>
  );
};
