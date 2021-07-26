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

const checkValid = (value: string, type: string) => {
  if (!value) {
    return false;
  }
  return REG_MAPPING[type].test(value);
};

/**
 * 校验：是否合法的手机号
 * @param phone
 */
export const isValidPhone = (phone: string) => checkValid(phone, 'phone');
/**
 * 校验：是否合法的固话
 * @param tel
 */
export const isValidTel = (tel: string) => checkValid(tel, 'tel');
/**
 * 校验：是否是合法银行卡号
 * @param bank
 */
export const isValidBankNo = (bank: string) => checkValid(bank, 'bank');
/**
 * 校验：是否是合法的邮箱
 * @param email
 */
export const isValidEmail = (email: string) => checkValid(email, 'email');
/**
 * 校验：是否是合法的邮编
 * @param postcode
 */
export const isValidPostcode = (postcode: string) => checkValid(postcode, 'postcode');
/**
 * 校验：是否是合法的数字
 * @param number
 */
export const isValidNumber = (number: string) => checkValid(number, 'number');
/**
 * 校验：是否是合法的中文
 * @param cn
 */
export const isValidChinese = (cn: string) => checkValid(cn, 'cn');

export default {
  isValidPhone,
  isValidTel,
  isValidBankNo,
  isValidEmail,
  isValidPostcode,
  isValidNumber,
  isValidChinese,
};
