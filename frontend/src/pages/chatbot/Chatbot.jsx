import React, { useRef, useState } from "react";
import axios from "axios";

const threeDots =
  "https://www.bearghost.com/wp-content/uploads/2019/09/dots.gif";

const Chatbot = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, how can I help you?" },
  ]);
  const inputRef = useRef();

  const sendMessage = async () => {
    try {
      const newMessage = { sender: "user", text: msg };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMsg("");
      inputRef.current.value = "";

      const response = await axios.post(
        "http://localhost:5000/api/gemini/chat",
        {
          message: msg,
        }
      );

      const botResponse = { sender: "bot", text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="relative flex sm:h-[450px] md:h-[550px] w-[550px] p-4 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="h-[460px] w-full overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg ${
                message.sender === "user"
                  ? "bg-white my-2 text-md p-4"
                  : "bg-violet-500 text-white my-2 text-md p-3"
              } px-4 py-2`}
            >
              {!message.text ? (
                <div className="h-12 p-2 w-[32px] rounded-md">
                  <img
                    src={threeDots}
                    alt="gif"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex absolute bottom-2 items-center w-full">
        <input
          ref={inputRef}
          value={msg}
          type="text"
          placeholder="..."
          className="h-12 w-10/12 rounded-full focus:outline-none px-4 mr-2"
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
          onClick={sendMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 transform rotate-[-25deg] hover:text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
