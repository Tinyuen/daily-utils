// import axios from 'axios';

// const instance = axios.create({
//   baseURL: '/',
//   timeout: 60 * 1000,
// });
//
// const commonRequest = () => {
//
// };

const request = {
  get: () => {
    return new Promise((resolve, _) => {
      resolve('success!');
    });
  },
  post: () => {

  },
};

export default request;

