import { KeyboardEvent, useState, useRef, useEffect } from "react";
import ChatList from "./components/ChatList";
import useChatList from "@hooks/useChatList";
import styles from "./index.module.less";

const robotName = "test";
const Entry = () => {
  const { chatList, deleteChat, sendChat, pushChatLeft } = useChatList();
  const [inputValue, setInputValue] = useState("你是谁");

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMes();
    }
  };

  const sendMes = () => {
    if (!inputValue.trim()) {
      return;
    }
    sendChat(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    window.setTimeout(() => {
      pushChatLeft("hello world!");
    }, 1000);
  }, []);

  return (
    <div className={styles.chatWrap}>
      <h1 className={styles.chatTitle}>{robotName}</h1>
      <ChatList list={chatList} onDelete={deleteChat} />
      <div className={styles.chatInputWrap}>
        <input
          className={styles.chatInput}
          type="text"
          maxLength={140}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={onKeyUp}
        />
        <button
          className={styles.sendBtn}
          disabled={!inputValue.trim()}
          onClick={sendMes}
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default Entry;
