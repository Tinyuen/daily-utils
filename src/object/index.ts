/**
 * Object utils
 * ObjectUtil.isObject({});
 */

type checkTypeFunction = (data: any) => boolean;

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

const typeChecker: {[key: string]: checkTypeFunction} = {};

OBJECT_TYPES.forEach(type => {
  typeChecker[`is${type}`] = (data: any) => Object.prototype.toString.call(data) === `[object ${type}]`;
});

export const objectUtil = {
  /**
   * 类型判断：是否是 Boolean
   */
  isBoolean: typeChecker.isBoolean,
  /**
   * 类型判断：是否是 Undefined
   */
  isUndefined: typeChecker.isUndefined,
  /**
   * 类型判断：是否是 Number
   */
  isNumber: typeChecker.isNumber,
  /**
   * 类型判断：是否是 String
   */
  isString: typeChecker.isString,
  /**
   * 类型判断：是否是 Symbol
   */
  isSymbol: typeChecker.isSymbol,
  /**
   * 类型判断：是否是 Null:
   */
  isNull: typeChecker.isNull,
  /**
   * 类型判断：是否是 RegExp
   */
  isRegExp: typeChecker.isRegExp,
  /**
   * 类型判断：是否是 Object
   */
  isObject: typeChecker.isObject,
  /**
   * 类型判断：是否是 Array
   */
  isArray: typeChecker.isArray,
  /**
   * 类型判断：是否是 Function
   */
  isFunction: typeChecker.isFunction,
  /**
   * 类型判断：是否是 Date:
   */
  isDate: typeChecker.isDate,
  /**
   * 类型判断：是否是 Error
   */
  isError: typeChecker.isError,
};

export default objectUtil;
