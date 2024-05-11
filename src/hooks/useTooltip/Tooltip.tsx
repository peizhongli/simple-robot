import { CSSProperties, TouchEvent, useEffect } from "react";
import { Content } from "./index";
import styles from "./index.module.less";

interface tooltipProps {
  content: Content[];
  style: CSSProperties;
  destroy?: () => void;
  onSelect: (menuKey: string) => void;
}

const Tooltip = (props: tooltipProps) => {
  const { style, content, onSelect, destroy } = props;

  useEffect(() => {
    const listener = () => {
      destroy && destroy();
    };
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("touchstart", listener);
    };
  });

  return (
    <ul
      className={styles.tooltip}
      style={style}
      onTouchStart={(e: TouchEvent) => e.stopPropagation()}
    >
      {content.map((i: Content) => (
        <li key={i.key} onClick={() => onSelect(i.key)}>
          {i.title}
        </li>
      ))}
    </ul>
  );
};

export default Tooltip;
