export type IObjectUtilHandler = (data: any) => boolean;
export interface IObjectUtil {
  /**
   * 类型判断：是否是 Boolean
   */
  isBoolean: IObjectUtilHandler;
  /**
   * 类型判断：是否是 Undefined
   */
  isUndefined: IObjectUtilHandler;
  /**
   * 类型判断：是否是 Number
   */
  isNumber: IObjectUtilHandler;
  /**
   * 类型判断：是否是 String
   */
  isString: IObjectUtilHandler;
  /**
   * 类型判断：是否是 Symbol
   */
  isSymbol: IObjectUtilHandler;
  /**
   * 类型判断：是否是 Null:
   */
  isNull: IObjectUtilHandler;
  /**
   * 类型判断：是否是 RegExp
   */
  isRegExp: IObjectUtilHandler;
  /**
   * 类型判断：是否是 Object
   */
  isObject: IObjectUtilHandler;
  /**
   * 类型判断：是否是 Array
   */
  isArray: IObjectUtilHandler;
  /**
   * 类型判断：是否是 Function
   */
  isFunction: IObjectUtilHandler;
  /**
   * 类型判断：是否是 Date:
   */
  isDate: IObjectUtilHandler;
  /**
   * 类型判断：是否是 Error
   */
  isError: IObjectUtilHandler;
}

const OBJECT_TYPES = [
  'Boolean',
  'Undefined',
  'Number',
  'String',
  'Symbol',
  'Null',
  'RegExp',
  'Object',
  'Array',
  'Function',
  'Date',
  'Error',
];

const typeChecker: {[key: string]: IObjectUtilHandler} = {};

OBJECT_TYPES.forEach(type => {
  typeChecker[`is${type}`] = (data: any) => Object.prototype.toString.call(data) === `[object ${type}]`;
});

export const objectUtil: IObjectUtil = {
  isBoolean: typeChecker.isBoolean,
  isUndefined: typeChecker.isUndefined,
  isNumber: typeChecker.isNumber,
  isString: typeChecker.isString,
  isSymbol: typeChecker.isSymbol,
  isNull: typeChecker.isNull,
  isRegExp: typeChecker.isRegExp,
  isObject: typeChecker.isObject,
  isArray: typeChecker.isArray,
  isFunction: typeChecker.isFunction,
  isDate: typeChecker.isDate,
  isError: typeChecker.isError,
};

export default objectUtil;
