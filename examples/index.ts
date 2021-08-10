// import { objectUtil } from '../es';
// import cookies from '../src/cookie';
import { tinStorage } from '../src';

// console.log('111', objectUtil.isObject({}));
// console.log('== cookie ==', cookies.get('templateCode'));
// const valid = regexp.isValidEmail('x@qq.com');
// console.log('---- valid ---', valid);
// tinStorage.local.set('test', undefined);
tinStorage.session.set('test', 111);
setTimeout(() => {
  console.log('==>', tinStorage.session.has('taest'));
})

