export type IRegexUtilHandler = (target: string) => boolean;
export interface IRegexUtil {
  /**
   * 校验：是否合法的手机号
   * @param phone
   */
  isValidPhone: IRegexUtilHandler;
  /**
   * 校验：是否合法的固话
   * @param tel
   */
  isValidTel: IRegexUtilHandler;
  /**
   * 校验：是否是合法银行卡号
   * @param bank
   */
  isValidBankNo: IRegexUtilHandler;
  /**
   * 校验：是否是合法的邮箱
   * @param email
   */
  isValidEmail: IRegexUtilHandler;
  /**
   * 校验：是否是合法的邮编
   * @param postcode
   */
  isValidPostcode: IRegexUtilHandler;
  /**
   * 校验：是否是合法的数字
   * @param number
   */
  isValidNumber: IRegexUtilHandler;
  /**
   * 校验：是否是合法的中文
   * @param cn
   */
  isValidChinese: IRegexUtilHandler;
}

/** 手机 */
export const REG_PHONE = /^1[3456789]\d{9}$/;
/** 固话 */
export const REG_TEL = /^([0-9]{3,4}-?)?[0-9]{7,8}$/;
/** 银行卡号 */
export const REG_BANK = /^([1-9]\d{15,18})$/;
/** email */
export const REG_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
/** 邮编 */
export const REG_POSTCODE = /^\d{6}$/;
/** 数字 */
export const REG_NUMBER = /^\d+$/;
/** 中文 */
export const REG_CN = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[\u2E80-\uFE4F]|\s)*$/;

const REG_MAPPING = {
  phone: REG_PHONE,
  tel: REG_TEL,
  bank: REG_BANK,
  email: REG_EMAIL,
  postcode: REG_POSTCODE,
  number: REG_NUMBER,
  cn: REG_CN,
};

const checkValid = (value: string, type: string): boolean => {
  if (!value) {
    return false;
  }
  return REG_MAPPING[type].test(value);
};

/**
 * 校验：是否合法的手机号
 * @param phone
 */
export const isValidPhone: IRegexUtilHandler = (phone: string) => checkValid(phone, 'phone');
/**
 * 校验：是否合法的固话
 * @param tel
 */
export const isValidTel: IRegexUtilHandler = (tel: string) => checkValid(tel, 'tel');
/**
 * 校验：是否是合法银行卡号
 * @param bank
 */
export const isValidBankNo: IRegexUtilHandler = (bank: string) => checkValid(bank, 'bank');
/**
 * 校验：是否是合法的邮箱
 * @param email
 */
export const isValidEmail: IRegexUtilHandler = (email: string) => checkValid(email, 'email');
/**
 * 校验：是否是合法的邮编
 * @param postcode
 */
export const isValidPostcode: IRegexUtilHandler = (postcode: string) => checkValid(postcode, 'postcode');
/**
 * 校验：是否是合法的数字
 * @param number
 */
export const isValidNumber: IRegexUtilHandler = (number: string) => checkValid(number, 'number');
/**
 * 校验：是否是合法的中文
 * @param cn
 */
export const isValidChinese: IRegexUtilHandler = (cn: string) => checkValid(cn, 'cn');

const regexUtil: IRegexUtil = {
  isValidPhone,
  isValidTel,
  isValidBankNo,
  isValidEmail,
  isValidPostcode,
  isValidNumber,
  isValidChinese,
};

export default regexUtil;
