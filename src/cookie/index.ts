/**
 * Cookie utils
 */
import { device, objectUtil } from '../index';

/**
 * 获取 cookie
 * @param key
 */
const getCookie = (key: string) => {
  if (!device.isClient()) {
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
 */
function setCookie(key: string, value: string, expired?: number): void;
function setCookie(params: {key: string; value: string; domain?: string; expired?: number}): void;
function setCookie(...args) {
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
 */
const deleteCookie = (key: string, domain?: string) => {
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

const cookies = {
  get: getCookie,
  set: setCookie,
  delete: deleteCookie,
};

export default cookies;
