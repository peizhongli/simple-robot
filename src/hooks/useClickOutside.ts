import { MutableRefObject, useEffect } from "react";

export default (
  el: MutableRefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  const stopPop = (e: Event) => {
    e.stopPropagation();
  };

  const outsideListener = () => {
    callback();
  };

  useEffect(() => {
    const element = el.current;
    element?.addEventListener("click", stopPop);
    document.addEventListener("click", outsideListener);
    return () => {
      element?.removeEventListener("click", stopPop);
      document.removeEventListener("click", outsideListener);
    };
  }, [el]);
};
