import { MockMethod } from 'vite-plugin-mock';
import { list, detail } from './result';

// // 默认 为 分页格式 返回数组对象
// // 存在 post 为 detail 返回一个对象

const urls = {
  // 基础档案列表: '/health/base/oldManSearch',
};

function axios() {
  const arrs: any = [];
  Object.keys(urls).map((key) => {
    let method = 'get';
    if (key.indexOf('post') > -1) {
      method = 'post';
    }
    const obj: any = {
      url: '/local' + urls[key],
      timeout: 300,
      method: method,
      response: ({ query }) => {
        if (method == 'post') {
          return detail();
        }
        if (method == 'get') {
          return list(query.current);
        }
      },
    };
    arrs.push(obj);
  });
  return arrs;
}
const mocklistapi = axios();
export default [...mocklistapi] as MockMethod[];
