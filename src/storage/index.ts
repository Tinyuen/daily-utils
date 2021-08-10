import { isClient } from '../device';
import { tinObject } from '../index';

export type StorageType = 'session' | 'local';
export interface StorageValue {
  value: string;
  // 当前时间戳
  now?: number;
  // 超时时间（ms)
  expired?: number;
}
export interface ITinStorage {
  /**
   * 获取 storage
   * @param key
   */
  get: (key: string) => string | null;
  /**
   * 设置 storage
   * @param key
   * @param value
   * @param expired
   */
  set: (key: string, value: any, expired?: number) => void;
  /**
   * 删除 storage
   * @param key
   */
  remove: (key: string) => void;
  /**
   * 清空 storage
   */
  clear: () => void;
  /**
   * 获取所有 storage 的个数，同 .length
   */
  size: () => number;
  /**
   * 是否有 storage
   * @param key
   */
  has: (key: string) => boolean;
  /**
   * 获取所有 storage 的个数，同 size()
   */
  length: number;
}

const getStorageInterface = (type: StorageType) => {
  if (isClient()) {
    return type === 'session' ? window.sessionStorage : window.localStorage;
  }
  return null;
};

const formatStorageValue = (_value, expired = 0): string => {
  try {
    let value = _value;
    if (tinObject.isUndefined(value) || tinObject.isFunction(value)) {
      value = JSON.stringify(`${value}`);
    } else if (tinObject.isSymbol(value) || tinObject.isRegExp(value)) {
      value = JSON.stringify(null);
    } else {
      value = JSON.stringify(value);
    }
    const data: StorageValue = { value };
    if (!Number.isNaN(expired) && expired !== 0) {
      data.expired = expired;
      data.now = +new Date();
    }
    return JSON.stringify(data);
  } catch (e) {
    console.log('tinStorage: format storage value field.', e);
    return '';
  }
};

const storageHandler = (type: StorageType) => {
  const storageInstance = getStorageInterface(type);
  const handler: ITinStorage = {
    get: (key: string) => {
      try {
        if (!(storageInstance && key)) {
          return null;
        }
        const value = storageInstance.getItem(key);
        if (!value) {
          return null;
        }
        const valueParsed: StorageValue = JSON.parse(value);
        // 如果过期
        if (valueParsed.now && valueParsed.expired && +new Date() > valueParsed.now + valueParsed.expired) {
          storageInstance.removeItem(key);
          return null;
        }
        return JSON.parse(valueParsed.value);
      } catch (e) {
        return null;
      }
    },
    set: (key: string, value: any, expired?: number) => {
      if (storageInstance && key) {
        storageInstance.setItem(key, formatStorageValue(value, expired));
      }
    },
    remove: (key: string) => {
      if (storageInstance && key) {
        storageInstance.removeItem(key);
      }
    },
    clear: () => {
      if (storageInstance) {
        storageInstance.clear();
      }
    },
    has: (key: string) => {
      if (storageInstance && key) {
        return !!handler.get(key);
      }
      return false;
    },
    size: () => (storageInstance ? storageInstance.length : 0),
    length: storageInstance ? storageInstance.length : 0,
  };
  return handler;
};

const sessionStorageHandler: ITinStorage = storageHandler('session');
const localStorageHandler: ITinStorage = storageHandler('local');


export const tinSessionStorage = sessionStorageHandler;
export const tinLocalStorage = localStorageHandler;
export const tinStorage = {
  session: sessionStorageHandler,
  local: localStorageHandler,
};
export default tinStorage;

