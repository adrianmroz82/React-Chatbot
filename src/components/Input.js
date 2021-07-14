import { useState } from 'react';
import axios from 'axios';

import './Input.css';

const Input = (props) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMsg = {
      content: message,
      isBot: false,
      time: new Date(),
    };
    props.setMsgList([...props.msgList, userMsg]);
    setMessage('');

    axios
      .get(
        `https://restcountries.eu/rest/v2/name/${message}
    `
      )
      .then((res) => {
        const countryData = res.data[0];
        props.setMsgList([
          ...props.msgList,
          userMsg,
          {
            content: `
        ${countryData.name} has a capital in ${countryData.capital}. It is located in ${countryData.region} and is populated by ${countryData.population} people. Fun fact, the Japanese translation of that country is ${countryData.translations.ja} Moreover, you can see the country's flag below.
        `,
            isBot: true,
            time: new Date(),
            flag: countryData.flag,
          },
        ]);
      })
      .catch((err) => {
        props.setMsgList([
          ...props.msgList,
          userMsg,
          {
            content: `${message} is not a country. Try something else.`,
            isBot: true,
            time: new Date(),
          },
        ]);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        onChange={(e) => setMessage(e.target.value)}
        className="input"
        type="text"
        value={message}
        placeholder="Write the name of a country..."
      />
      <button className="chat-button">
        <i className="fa-lg fas fa-paper-plane"></i>
      </button>
    </form>
  );
};

export default Input;
