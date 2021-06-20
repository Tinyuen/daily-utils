/**
 * 客户端设备环境检测工具库
 * 仅支持客户端浏览器环境环境使用
 */

/**
 * 获取设备UA
 * @param ua
 */
const getUserAgent = (ua?: string) => {
  if (ua) {
    return ua.toLowerCase();
  }
  return typeof window !== undefined && navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
};

/**
 * 是否微信环境
 * @param ua
 */
const isWeChat = (ua?: string) => {
  return /micromessenger/i.test(getUserAgent(ua));
};

/**
 * 是否百度小程序
 * @param ua
 */
const isBaiduApp = (ua?: string) => {
  return /baiduboxapp/i.test(getUserAgent(ua));
};

const device = {
  isWeChat,
  isBaiduApp,
};

export default device;
