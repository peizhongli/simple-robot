export const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
export const isAndroid = /Android/i.test(navigator.userAgent);
export const PHONE_NUMBER_REG = /^1[3-9]\d{9}$/;

export const generateUUID = () => {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};
