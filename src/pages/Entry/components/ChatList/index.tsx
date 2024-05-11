import { KeyboardEvent, useState, useRef, useEffect } from "react";
import { ChatItem as ChatItemType } from "@hooks/useChatList";
import useLongPress from "@hooks/useLongPress";
import useTooltip from "@hooks/useTooltip";
import useClipboard from "@hooks/useClipboard";
import styles from "./index.module.less";

interface ChatListProps {
  list: ChatItemType[];
  onDelete: (key: string) => void;
}
const ChatList = (props: ChatListProps) => {
  const { list, onDelete } = props;
  const chatListWrap = useRef<HTMLUListElement | null>(null);

  const { copyToClipboard } = useClipboard();

  const { show: showTooltip, clear: clearTooltip } = useTooltip({
    menu: ["删除", "复制"].map((i) => ({ title: i, key: i })),
    onSelect: (menuKey: string, key: string) => handleSelectMenu(menuKey, key),
  });

  useLongPress(chatListWrap, (e: TouchEvent) => {
    const chatId = (e.target as HTMLElement).getAttribute("data-chat-key");
    if (!chatId) {
      return;
    }
    showTooltip(e, chatId);
  });

  const handleSelectMenu = (key: string, id: string) => {
    switch (key) {
      case "删除":
        onDelete(id);
        break;
      case "复制":
        copyToClipboard(list.find((i) => i.id === id)?.content || "");
        break;

      default:
        break;
    }
    clearTooltip();
  };

  const scrollToBottom = () => {
    const wrapper = chatListWrap.current as HTMLElement;
    wrapper.scrollTop = wrapper.scrollHeight;
  };

  useEffect(() => {
    window.setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [list]);

  return (
    <ul className={styles.chatList} ref={chatListWrap}>
      {list.map((item) => (
        <li
          key={item.id}
          className={[styles.chatItem, styles[item.from]].join(" ")}
        >
          <div
            data-chat-key={item.id}
            data-time={item.time}
            className={styles.chatItemContent}
          >
            {item.content}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
