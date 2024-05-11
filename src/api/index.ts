import { $post } from "@service";
import { TULING_API_KEY, REQ_TYPE } from "./constanst";

const userId = "abc123";
const PREFIX = "/tuling";
// 图灵
export const postMessage = async (text: string) => {
  const { results: answers } = await $post(`${PREFIX}/api/v2`, {
    reqType: REQ_TYPE.TEXT,
    perception: {
      inputText: {
        text,
      },
      // inputImage: {
      //     url: 'imageUrl'
      // },
      // selfInfo: {
      //     location: {
      //         city: '北京',
      //         province: '北京',
      //         street: '信息路'
      //     }
      // }
    },
    userInfo: {
      apiKey: TULING_API_KEY,
      userId,
    },
  });
  return answers.length ? answers[0].values?.text || "" : "";
};

// 青云客
// export const postMessage = async (text: string) => {
//   const { content } = await $get("/qingyunke", {
//     key: "free",
//     appid: 0,
//     msg: text,
//   });
//   return content;
// };
