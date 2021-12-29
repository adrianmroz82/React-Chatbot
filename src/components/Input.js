import { useState } from "react";
import axios from "axios";

import "./Input.css";

export const Input = (props) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMsg = {
      content: message,
      isBot: false,
      time: new Date(),
    };
    props.setMsgList([...props.msgList, userMsg]);
    setMessage("");

    axios
      .get(`https://restcountries.com/v3.1/name/${message}`)
      .then((res) => {
        const { name, capital, region, population, translations, flags } = res.data[0];
        props.setMsgList([
          ...props.msgList,
          userMsg,
          {
            content: `
        ${name.common} has a capital in ${capital}. It is located in ${region} and is populated by ${population} people. Fun fact, the Japanese translation of that country is ${translations.jpn.official} Moreover, you can see the country's flag below.
        `,
            isBot: true,
            time: new Date(),
            flag: flags.svg,
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
        onChange={handleChange}
        className="input"
        type="text"
        value={message}
        placeholder="Write the name of a country..."
      />
      <button className="chat-button">
        <i className="fa-lg fas fa-paper-plane" />
      </button>
    </form>
  );
};
