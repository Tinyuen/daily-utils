export type IDeviceHandler = (ua?: string) => boolean;
export interface IDevice {
  /**
   * 是否是客户端（浏览器）环境
   */
  isClient: () => boolean;
  /**
   * 是否微信环境
   * @param ua
   */
  isWeChat: IDeviceHandler;
  /**
   * 是否百度小程序
   * @param ua
   */
  isBaiduApp: IDeviceHandler;
  /**
   * 是否安卓设备
   * @param ua
   */
  isAndroid: IDeviceHandler;
  /**
   * 是否IOS设备
   * @param ua
   */
  isIOS: IDeviceHandler;
  /**
   * 是否支付宝
   * @param ua
   */
  isAlipayClient: IDeviceHandler;
  /**
   * 是否微信小程序
   * @param ua
   */
  isWeChatMinProgram: IDeviceHandler;
  /**
   * 是否头条
   * @param ua
   */
  isTouTiao: IDeviceHandler;
  /**
   * 是否抖音APP
   * @param ua
   */
  isDouYin: IDeviceHandler;
  /**
   * 是否西瓜APP
   * @param ua
   */
  isXiGua: IDeviceHandler;
  /**
   * 是否火山APP
   * @param ua
   */
  isHuoShan: IDeviceHandler;
  /**
   * 是否头条系APP
   * @param ua
   */
  isTouTiaoSeries: IDeviceHandler;
  /**
   * 是否头条小程序
   * @param ua
   */
  isTouTiaoMinProgram: IDeviceHandler;
  /**
   * 是否快手APP
   * @param ua
   */
  isKuaiShou: IDeviceHandler;
  /**
   * 是否快手急速版小程序
   * @param ua
   */
  isKuaiShouSpeedMinProgram: IDeviceHandler;
  /**
   * 是否快手小程序
   * @param ua
   */
  isKuaiShouMinProgram: IDeviceHandler;
  /**
   * 是否支付宝
   * @param ua
   */
  isAliApp: IDeviceHandler;
  /**
   * 是否在APP中
   * @param ua
   */
  isInApp: IDeviceHandler;
  /**
   * 是否在小程序中
   * @param ua
   */
  isInMinProgram: IDeviceHandler;
}

/**
 * 是否是客户端（浏览器）环境
 */
export const isClient: IDeviceHandler = (): boolean => typeof window !== 'undefined';

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
export const isWeChat: IDeviceHandler = (ua?: string) => {
  return /micromessenger/i.test(getUserAgent(ua));
};

/**
 * 是否百度小程序
 * @param ua
 */
export const isBaiduApp: IDeviceHandler = (ua?: string) => {
  return /baiduboxapp/i.test(getUserAgent(ua));
};

/**
 * 是否安卓设备
 * @param ua
 */
export const isAndroid: IDeviceHandler = (ua?: string) => {
  return /android/i.test(getUserAgent(ua));
};

/**
 * 是否IOS设备
 * @param ua
 */
export const isIOS: IDeviceHandler = (ua?: string) => {
  const _ua = getUserAgent(ua);
  return /iphone os/i.test(_ua) || /ipad/i.test(_ua);
};

/**
 * 是否支付宝
 * @param ua
 */
export const isAlipayClient: IDeviceHandler = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('AlipayClient') > -1;
};

/**
 * 是否微信小程序
 * @param ua
 */
export const isWeChatMinProgram: IDeviceHandler = (ua?: string) => {
  const _ua = getUserAgent(ua);
  return isWeChat(_ua) && _ua.indexOf('miniprogram') > -1;
};

/**
 * 是否头条
 * @param ua
 */
export const isTouTiao: IDeviceHandler = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('newsarticle') > -1;
};

/**
 * 是否抖音APP
 * @param ua
 */
export const isDouYin: IDeviceHandler = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('aweme') > -1;
};

/**
 * 是否西瓜APP
 * @param ua
 */
export const isXiGua: IDeviceHandler = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('videoarticle') > -1;
};

/**
 * 是否火山APP
 * @param ua
 */
export const isHuoShan: IDeviceHandler = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('live_stream') > -1;
};

/**
 * 是否头条系APP
 * @param ua
 */
export const isTouTiaoSeries: IDeviceHandler = (ua?: string) => {
  const _ua = getUserAgent(ua);
  return isTouTiao(_ua) || isDouYin(_ua) || isXiGua(_ua) || isHuoShan(_ua);
};

/**
 * 是否头条小程序
 * @param ua
 */
export const isTouTiaoMinProgram: IDeviceHandler = (ua?: string) => {
  return getUserAgent(ua).indexOf('toutiaomicroapp') > -1;
};

/**
 * 是否快手APP
 * @param ua
 */
export const isKuaiShou: IDeviceHandler = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('kwai') > -1;
};

/**
 * 是否快手急速版小程序
 * @param ua
 */
export const isKuaiShouSpeedMinProgram: IDeviceHandler = (ua?: string) => {
  const _ua = getUserAgent(ua);
  return _ua.indexOf('nebula') > -1 && _ua.indexOf('miniprogram') > -1;
};

/**
 * 是否快手小程序
 * @param ua
 */
export const isKuaiShouMinProgram: IDeviceHandler = (ua?: string) => {
  const _ua = getUserAgent(ua);
  return (_ua.indexOf('kuaishou') > -1 || _ua.indexOf('nebula') > -1) && _ua.indexOf('miniprogram') > -1;
};

/**
 * 是否支付宝
 * @param ua
 */
export const isAliApp: IDeviceHandler = (ua?: string) => {
  return (getUserAgent(ua)).indexOf('aliapp') > -1;
};

/**
 * 是否在APP中
 * @param ua
 */
export const isInApp: IDeviceHandler = (ua?: string) => {
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
export const isInMinProgram: IDeviceHandler = (ua?: string) => {
  return (
    isTouTiaoMinProgram(ua)
    || isWeChatMinProgram(ua)
    || isKuaiShouMinProgram(ua)
  );
};

const device: IDevice = {
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
export default device;
