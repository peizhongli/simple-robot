import { MutableRefObject, useState } from "react";

export default (el: MutableRefObject<HTMLDivElement | null>) => {
  const [direction, setDirection] = useState("bottom");
  const [styleOpt, setStyleOpt] = useState({});

  const getTipSize = async () => {
    setStyleOpt({
      visibility: "hidden",
      display: "block",
    });
    const element = el.current;
    if (!element) {
      return;
    }
    const tipHeight = element.scrollHeight;
    const tipWidth = element.scrollWidth;
    setStyleOpt({});

    return {
      height: tipHeight + 8, // 小三角高度+8
      width: tipWidth,
    };
  };

  return {
    direction,
    styleOpt,
    getTipSize,
    setTipStyle: setStyleOpt,
    setDirection,
  };
};
