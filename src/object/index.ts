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

const objectUtil = {
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
