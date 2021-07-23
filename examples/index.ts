// import { objectUtil } from '../es';
// import cookies from '../src/cookie';
import { regexp } from '../src';

// console.log('111', objectUtil.isObject({}));
// console.log('== cookie ==', cookies.get('templateCode'));
const valid = regexp.isValidEmail('x@qq.com');
console.log('---- valid ---', valid);

