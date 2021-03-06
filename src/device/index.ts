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
  /**
   * 是否iPhone X
   */
  isIphoneX: IDeviceHandler;
  /**
   * 获取IOS设备版本号
   */
  getIosVersion: () => number;
  /**
   * 获取Android设备版本号
   */
  getAndroidVersion: () => number;
  /**
   * 获取Chrome设备版本号
   */
  getChromeVersion: () => number;
}

const getVersion = (versionInfo: RegExpMatchArray | null): number => {
  if (!versionInfo) {
    return 0;
  }
  const str = (`${versionInfo}`).replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.'); // 得到版本号4.2.2
  return parseInt(str.split('.')[0], 10); // 得到版本号第一位
};

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

/**
 * 是否iPhone X
 */
export const isIphoneX: IDeviceHandler = () => {
  if (isIOS()) {
    return (window.screen.availHeight === 812 && window.screen.availWidth === 375)
      || (window.screen.availHeight === 896 && window.screen.availWidth === 414);
  }
  return false;
};

/**
 * 获取IOS版本
 * @param ua
 */
export const getIosVersion = (ua?: string): number => {
  const _ua = getUserAgent(ua);
  let version = 0;
  if (_ua.indexOf('like mac os x') > 0) {
    const vInfo = _ua.match(/os [\d._]+/gi);
    version = getVersion(vInfo);
  }
  return version;
};

/**
 * 获取安卓版本
 * @param ua
 */
export const getAndroidVersion = (ua?: string): number => {
  const _ua = getUserAgent(ua);
  let version = 0;
  if (_ua.indexOf('android') > 0) {
    const vInfo = _ua.match(/android [\d._]+/gi);
    version = getVersion(vInfo);
  }
  return version;
};

/**
 * 获取chrome版本
 * @param ua
 */
export const getChromeVersion = (ua?: string): number => {
  const _ua = getUserAgent(ua);
  let version = 0;
  if (_ua.indexOf('chrome') > 0) {
    const vInfo = _ua.match(/chrome\/[\d._]+/gi);
    version = getVersion(vInfo);
  }
  return version;
};

const tinDevice: IDevice = {
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
  isIphoneX,
  getIosVersion,
  getAndroidVersion,
  getChromeVersion,
};
export default tinDevice;
