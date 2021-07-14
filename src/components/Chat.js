// import Message from '../Messages/Message/Message';
import Header from './Header';
import Input from './Input';
import Message from './Message';
import './Chat.css';
import { useState } from 'react';

const Chat = () => {
  const [msgList, setMsgList] = useState([
    {
      content: `Hello, I am a Country Bot. I will provide the most important
      information about any country, such as capital, population or region.`,
      isBot: true,
      time: new Date(),
    },
  ]);

  return (
    <div className="container">
      <div className="chatting-container">
        <Header />
        <Message msgList={msgList} />
        <Input msgList={msgList} setMsgList={setMsgList} />
      </div>
    </div>
  );
};

export default Chat;
