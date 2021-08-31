import tinObject from '../object';
import { isClient } from '../device';

/**
 * 解析 URL
 * @param url
 */
export const parseUrl = (url?: string): ITinUrlResult => {
  let _url = url || '';
  if (!_url && isClient()) {
    _url = window.location.href;
  }
  const result: ITinUrlResult = {
    hostPath: '',
    params: {},
    hash: '',
    routeType: 'history',
  };
  try {
    const indexQuery = _url.indexOf('?');
    const indexHash = _url.indexOf('#');
    if (indexQuery === -1 && indexHash === -1) {
      result.hostPath = _url;
      return result;
    }
    // history
    if (indexQuery !== -1 && (indexHash === -1 || (indexHash !== -1 && indexQuery < indexHash))) {
      result.routeType = 'history';
      result.hostPath = _url.slice(0, indexQuery);
      // 参数
      const searchString = indexHash !== -1 ? _url.slice(indexQuery + 1, indexHash) : _url.slice(indexQuery + 1);
      searchString.split('&').forEach(item => {
        const [key, value] = item.split('=');
        if (key) {
          result.params[key] = value || '';
        }
      });
      // hash
      indexHash !== -1 && (result.hash = _url.slice(indexHash + 1));
    } else if (indexHash !== -1 && (indexQuery === -1 || (indexQuery !== -1 && indexHash < indexQuery))) {
      // hash路由模式
      result.routeType = 'hash';
      result.hostPath = _url.slice(0, indexHash);
      // hash
      result.hash = indexQuery === -1
        ? _url.slice(indexHash + 1)
        : _url.slice(indexHash + 1, indexQuery);
      // 参数
      if (indexQuery !== -1) {
        const searchString = _url.slice(indexQuery + 1);
        searchString.split('&').forEach(item => {
          const [key, value] = item.split('=');
          if (key) {
            result.params[key] = value || '';
          }
        });
      }
    }
    return result;
  } catch (e) {
    console.error(e);
    return result;
  }
};

/**
 * 解析 URL 参数
 * @param url
 */
export const parseUrlParams = (url?: string) => parseUrl(url).params;

/**
 * 获取 URL 参数
 * @param key
 */
export const getUrlParam = (key: string): string => {
  if (!key) {
    return '';
  }
  return parseUrlParams()[key] || '';
};

/**
 * 扩展 URL 参数
 * @param url
 * @param data
 */
export const extendUrlParams = (url: string, data: {[key: string]: string} = {}): string => {
  if (!url) {
    return '';
  }
  const [hostPath, search] = url.split('?');
  let query = '';
  if (tinObject.isObject(data)) {
    let paramsCombine = {};
    if (search) {
      paramsCombine = parseUrlParams(`?${search}`);
    }
    paramsCombine = { ...paramsCombine, ...data };
    query = Object.keys(paramsCombine).map(key => `${key}=${paramsCombine[key]}`).join('&');
  } else {
    return url;
  }
  return `${hostPath}?${query}`;
};

/**
 * 将 data 转化成 URL
 * @param data
 */
export const convertToUrl = (data: ITinUrlResult): string => {
  if (!data) {
    return '';
  }
  const queryString = Object.keys(data.params).reduce((prev, key) => {
    const cur = `${prev ? '&' : ''}${key}=${data.params[key]}`;
    return prev + cur;
  }, '');
  if (data.routeType === 'history') {
    return `${data.hostPath}${queryString ? (`?${queryString}`) : ''}${data.hash ? (`#${data.hash}`) : ''}`;
  } if (data.routeType === 'hash') {
    return `${data.hostPath}${data.hash ? (`#${data.hash}`) : ''}${queryString ? (`?${queryString}`) : ''}`;
  }
  return '';
};

/**
 * 合并两个 URL
 * @param urlFirst
 * @param urlSecond
 * @param extraParams
 * @param excludeParams
 * @param forceExclude
 */
export const mergeUrl = (urlFirst: string, urlSecond: string, extraParams = {}, excludeParams: string[] = [], forceExclude = false) => {
  const url1 = parseUrl(urlFirst);
  const url2 = parseUrl(urlSecond);
  const result: {hostPath: string; params: { [key: string]: string }; hash: string} = {
    hostPath: '',
    params: {},
    hash: '',
  };
  result.hostPath = url2.hostPath || url1.hostPath;
  result.hash = url2.hash || url2.hash;
  const objMerge = (p1: { [key: string]: string }, p2: { [key: string]: string }) => {
    const obj = {};
    Object.keys(p1).forEach(key => {
      if (!excludeParams.includes(key)) {
        obj[key] = p1[key] || '';
      }
    });
    Object.keys(p2).forEach((key) => {
      if (excludeParams.includes(key) && forceExclude) { return; }
      if (obj[key] && !p2[key]) { return; }
      obj[key] = p2[key] || '';
    });
    return obj;
  };

  result.params = objMerge(url1.params, { ...url2.params, ...extraParams });
  const search = Object.keys(result.params).map(key => `${key}=${result.params[key]}`).join('&');
  return `${result.hostPath}${search ? `?${search}` : ''}${result.hash ? `#${result.hash}` : ''}`;
};


const tinUrl: ITinUrl = {
  parseUrl,
  parseUrlParams,
  extendUrlParams,
  convertToUrl,
  getUrlParam,
  mergeUrl,
};
export default tinUrl;


export interface ITinUrl {
  /**
   * 解析 URL 参数
   * @param url
   */
  parseUrlParams(url?: string): { [key: string]: string };
  /**
   * 解析 url
   * @param url 需解析的地址
   * @return ITinUrlResult
   */
  parseUrl(url?: string): ITinUrlResult;
  /**
   * 扩展 URL 参数
   * @param url 原始url
   * @param data 扩展的参数对象
   */
  extendUrlParams(url: string, data: { [key: string]: string }): string;
  /**
   * 将 data:ITinUrlResult 转化成 URL
   * @param data 需要转换的object
   */
  convertToUrl(data: ITinUrlResult): string;
  /**
   * 获取 URL 指定参数
   * @param key 获取值的名称
   */
  getUrlParam(key: string): string;
  /**
   * 合并两个url
   * @param urlFirst 需要合并得url (为'' | undefined | null 默认是当前地址)
   * @param urlSecond 需要合并得url
   * @param extraParams 需要合并额外参数
   * @param excludeParams 排除合并之后参数不携带的参数列表
   * @param forceExclude 是否强制排除参数（即：对 urlSecond 的参数也不进行合并，默认是只排除urlFirst的参数）
   */
  mergeUrl(urlFirst: string, urlSecond: string, extraParams?: { [key: string]: string }, excludeParams?: string[], forceExclude?: boolean): string;
}

export interface ITinUrlResult {
  routeType: 'history' | 'hash';
  hash: string;
  hostPath: string;
  params: { [key: string]: string };
}
