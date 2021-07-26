/**
 * 客户端设备环境检测工具库
 * 仅支持客户端浏览器环境环境使用
 */

/**
 * 是否是客户端（浏览器）环境
 */
export const isClient = (): boolean => typeof window !== 'undefined';

/**
 * 获取设备UA
 * @param ua
 */
export const getUserAgent = (ua?: string) => {
  if (ua) {
    return ua.toLowerCase();
  }
  return isClient() && navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
};

/**
 * 是否微信环境
 * @param ua
 */
export const isWeChat = (ua?: string) => {
  return /micromessenger/i.test(getUserAgent(ua));
};

/**
 * 是否百度小程序
 * @param ua
 */
export const isBaiduApp = (ua?: string) => {
  return /baiduboxapp/i.test(getUserAgent(ua));
};

/**
 * 是否安卓设备
 * @param ua
 */
export const isAndroid = (ua?: string) => {
  return /android/i.test(getUserAgent(ua));
};

/**
 * 是否IOS设备
 * @param ua
 */
export const isIOS = (ua?: string) => {
  const _ua = getUserAgent(ua);
  return /iphone os/i.test(_ua) || /ipad/i.test(_ua);
};

/**
 * 是否支付宝
 * @param ua
 */
export const isAlipayClient = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('AlipayClient') > -1;
};

/**
 * 是否微信小程序
 * @param ua
 */
export const isWeChatMinProgram = (ua?: string) => {
  const _ua = getUserAgent(ua);
  return isWeChat(_ua) && _ua.indexOf('miniprogram') > -1;
};

/**
 * 是否头条
 * @param ua
 */
export const isTouTiao = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('newsarticle') > -1;
};

/**
 * 是否抖音APP
 * @param ua
 */
export const isDouYin = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('aweme') > -1;
};

/**
 * 是否西瓜APP
 * @param ua
 */
export const isXiGua = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('videoarticle') > -1;
};

/**
 * 是否火山APP
 * @param ua
 */
export const isHuoShan = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('live_stream') > -1;
};

/**
 * 是否头条系APP
 * @param ua
 */
export const isTouTiaoSeries = (ua?: string) => {
  const _ua = getUserAgent(ua);
  return isTouTiao(_ua) || isDouYin(_ua) || isXiGua(_ua) || isHuoShan(_ua);
};

/**
 * 是否头条小程序
 * @param ua
 */
export const isTouTiaoMinProgram = (ua?: string) => {
  return getUserAgent(ua).indexOf('toutiaomicroapp') > -1;
};

/**
 * 是否快手APP
 * @param ua
 */
export const isKuaiShou = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('kwai') > -1;
};

/**
 * 是否快手急速版小程序
 * @param ua
 */
export const isKuaiShouSpeedMinProgram = (ua?: string) => {
  const _ua = getUserAgent(ua);
  return _ua.indexOf('nebula') > -1 && _ua.indexOf('miniprogram') > -1;
};

/**
 * 是否快手小程序
 * @param ua
 */
export const isKuaiShouMinProgram = (ua?: string) => {
  const _ua = getUserAgent(ua);
  return (_ua.indexOf('kuaishou') > -1 || _ua.indexOf('nebula') > -1) && _ua.indexOf('miniprogram') > -1;
};

/**
 * 是否支付宝
 * @param ua
 */
export const isAliApp = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('aliapp') > -1;
};

/**
 * 是否在APP中
 * @param ua
 */
export const isInApp = (ua?: string) => {
  return (
    isAliApp(ua)
    || isTouTiaoSeries(ua)
    || isKuaiShou(ua)
    || isWeChat(ua)
  );
};

/**
 * 是否在小程序中
 * @param ua
 */
export const isInMinProgram = (ua?: string) => {
  return (
    isTouTiaoMinProgram(ua)
    || isWeChatMinProgram(ua)
    || isKuaiShouMinProgram(ua)
  );
};

export default {
  isClient,
  isWeChat,
  isBaiduApp,
  isAndroid,
  isIOS,
  isAlipayClient,
  isWeChatMinProgram,
  isTouTiao,
  isDouYin,
  isXiGua,
  isHuoShan,
  isTouTiaoSeries,
  isTouTiaoMinProgram,
  isKuaiShou,
  isKuaiShouSpeedMinProgram,
  isKuaiShouMinProgram,
  isAliApp,
  isInApp,
  isInMinProgram,
};
