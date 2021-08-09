import { isClient } from '../device';
import { objectUtil } from '../object';

export declare function ISetCookieHandler(key: string, value: string, expired?: number): void;
export declare function ISetCookieHandler(params: {
  key: string;
  value: string;
  domain?: string;
  expired?: number;
}): void;
export interface ICookies {
  /**
   * 获取 cookie
   * @param key cookie key
   */
  get: (key: string) => string;
  /**
   * 设置 cookie
   */
  set: typeof ISetCookieHandler;
  /**
   * 删除 cookie
   * @param key
   */
  delete: (key: string, domain?: string) => void;
}

/**
 * 获取 cookie
 * @param key cookie key
 */
export const getCookie = (key: string) => {
  if (!isClient()) {
    return '';
  }
  let result = '';
  const cookieStr = document.cookie;
  const cookieStrList = cookieStr.split('; ');
  if (objectUtil.isArray(cookieStrList) && cookieStrList.length > 0) {
    for (let i = 0; i < cookieStrList.length; i++) {
      const [_key, _value] = cookieStrList[i].split('=');
      if (key === _key) {
        result = _value;
        break;
      }
    }
  }
  return result;
};

/**
 * 设置 cookie
 * @param key
 * @param value
 * @param expired
 */
export function setCookie(key: string, value: string, expired?: number): void;
/**
 * 设置 cookie
 * @param params
 */
export function setCookie(params: {key: string; value: string; domain?: string; expired?: number}): void;
/**
 * 设置 cookie
 * @param args
 */
export function setCookie(...args) {
  let domain = '';
  let [key, value, expired] = args;
  if (objectUtil.isObject(key)) {
    const { key: _key, value: _value, domain: _domain, expired: _expired } = key;
    key = _key;
    value = _value;
    domain = _domain;
    expired = _expired;
  }
  let cookieStr = `${key}=${value};path=/`;
  if (objectUtil.isNumber(expired)) {
    const date = new Date();
    date.setTime(date.getTime() + (expired * 1000));
    cookieStr += `;expires=${date.toUTCString()}`;
  }
  if (domain) {
    cookieStr += `;domain=${domain}`;
  }
  document.cookie = cookieStr;
}

/**
 * 删除 cookie
 * @param key
 * @param domain
 */
export const deleteCookie = (key: string, domain?: string) => {
  if (domain) {
    setCookie({
      key,
      value: '',
      domain,
      expired: -1000,
    });
  } else {
    setCookie(key, '', -1000);
  }
};

const tinCookies: ICookies = {
  get: getCookie,
  set: setCookie,
  delete: deleteCookie,
};
export default tinCookies;

