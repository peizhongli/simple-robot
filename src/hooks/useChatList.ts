import { useState } from "react";
import dayjs from "dayjs";
import { generateUUID } from "@utils";
import { postMessage } from "@api";

enum FROM {
  Left = "left",
  Right = "right",
}
export interface ChatItem {
  from: FROM;
  content: string;
  time: string;
  id: string;
}
export default () => {
  const [chatList, setChatList] = useState<ChatItem[]>([]);

  const pushChat = (content: string, from: FROM) => {
    setChatList((v) => [
      ...v,
      {
        from,
        content,
        time: dayjs().format("YYYY-MM-DD HH:mm"),
        id: generateUUID(),
      },
    ]);
  };

  const deleteChat = (id: string) =>
    setChatList((v) => v.filter((i) => i.id !== id));

  const pushChatLeft = (content: string) => pushChat(content, FROM.Left);

  const pushChatRight = (content: string) => pushChat(content, FROM.Right);

  const fetchPostMessage = async (text: string) => {
    const answer = await postMessage(text);
    pushChatLeft(answer);
  };

  const sendChat = (content: string) => {
    pushChatRight(content);
    fetchPostMessage(content);
  };

  return {
    chatList,
    pushChatLeft,
    pushChatRight,
    sendChat,
    deleteChat,
  };
};
