import { useRef, ReactNode } from "react";
import useTipContent from "@hooks/useTipContent";
import useLongPress from "@hooks/useLongPress";
import useClickOutside from "@hooks/useClickOutside";
import styles from "./index.module.less";

interface TooltipProps {
  content: ReactNode;
  visible: boolean;
  customClass?: string;
  onVisibleChange: (visible: boolean) => void;
  children: ReactNode;
}

const Tooltip = (props: TooltipProps) => {
  const {
    customClass = "",
    onVisibleChange,
    content,
    visible,
    children,
  } = props;

  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const { direction, styleOpt, getTipSize, setTipStyle, setDirection } =
    useTipContent(tooltipRef);

  useLongPress(wrapRef, (e: TouchEvent) => {
    console.log("!!! :>> ", e.touches);
    handleLongPress();
  });

  useClickOutside(tooltipRef, () => {
    handleClickOutside();
  });

  const handleClickOutside = () => {
    onVisibleChange(false);
  };

  const handleLongPress = async () => {
    const el = wrapRef.current as HTMLElement;
    const { height, width } = await getTipSize();
    const position = el.getBoundingClientRect();
    // 子元素才是内部的实际视图单位
    const elChildLeft = el.children[0].getBoundingClientRect().x;
    // 判断是否超出视图
    const overViewTop = el.offsetTop < height;
    const overViewLeft = elChildLeft > window.innerWidth - width;
    setDirection(overViewTop ? "bottom" : "top");
    setTipStyle({
      left: overViewLeft ? `calc(100% - ${width + 8}px)` : `${elChildLeft}px`,
      top: `${overViewTop ? position.bottom : position.top - height}px`,
    });
    onVisibleChange(true);
  };

  return (
    <>
      <div
        className={[customClass, styles.tooltipItem].join(" ")}
        ref={wrapRef}
      >
        {children}
      </div>
      {visible && (
        <div
          ref={tooltipRef}
          className={[styles.tooltip, styles[direction]].join(" ")}
          style={styleOpt}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default Tooltip;
