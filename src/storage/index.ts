import { isClient } from '../device';

type StorageType = 'session' | 'local';
interface StorageValue {
  value: string;
  // 当前时间戳
  now?: number;
  // 超时时间（ms)
  expired?: number;
}
interface ITinStorage {
  get: (key: string) => any;
}

const getStorageInterface = (type: StorageType) => {
  if (isClient()) {
    return type === 'session' ? window.sessionStorage : window.localStorage;
  }
  return null;
};

const storageHandler = (type: StorageType) => {
  const storageInstance = getStorageInterface(type);
  return {
    get: (key: string) => {
      if (!(storageInstance && key)) {
        return null;
      }
      const value = storageInstance.getItem(key);
      if (!value) {
        return null;
      }
      try {
        const valueParse = JSON.parse(value);
      } catch (e) {
        return null;
      }
    },
    set: (key: string, value: any, expired?: number) => {
      if (storageInstance && key) {

      }
    },
    clear: () => {
      if (storageInstance) {
        storageInstance.clear();
      }
    },
    length: storageInstance ? storageInstance.length : 0,
  };
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

