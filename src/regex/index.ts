// 手机
export const REG_PHONE = /^1[3456789]\d{9}$/;
// 固话
export const REG_TEL = /^([0-9]{3,4}-?)?[0-9]{7,8}$/;
// 银行卡号
export const REG_BANK = /^([1-9]\d{15,18})$/;
// email
export const REG_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
// 邮编
export const REG_POSTCODE = /^\d{6}$/;
// 数字
export const REG_NUMBER = /^\d+$/;
// 中文
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

const reg = {
  isValidPhone: (phone: string) => checkValid(phone, 'phone'),
  isValidTel: (phone: string) => checkValid(phone, 'tel'),
  isValidBankNo: (phone: string) => checkValid(phone, 'bank'),
  isValidEmail: (phone: string) => checkValid(phone, 'email'),
  isValidPostcode: (phone: string) => checkValid(phone, 'postcode'),
  isValidNumber: (phone: string) => checkValid(phone, 'number'),
  isValidChinese: (phone: string) => checkValid(phone, 'cn'),
};

export default reg;
