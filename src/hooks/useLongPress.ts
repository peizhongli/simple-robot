import { MutableRefObject, useEffect, useRef } from "react";

export default (
  el: MutableRefObject<HTMLElement | null>,
  callback: (e: TouchEvent) => void
) => {
  const timer = useRef<number | null>(null);

  const startListener = (e: TouchEvent) => {
    if (timer.current) {
      return;
    }
    timer.current = window.setTimeout(() => {
      callback(e);
    }, 0);
  };

  const endListener = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    const element = el.current;
    element?.addEventListener("touchstart", startListener);
    element?.addEventListener("touchend", endListener);
    return () => {
      element?.removeEventListener("touchstart", startListener);
      element?.removeEventListener("touchend", endListener);
    };
  }, [el]);
};
