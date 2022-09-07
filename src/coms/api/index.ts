import { defHttp } from '/@/utils/http/axios';

// upFile 文件上传 需要导入使用 import {upFile} from "/@/coms/api"
export const upFile = (file, callback) => {
  return new Promise(async (j) => {
    const formData = new window.FormData();
    formData.append('file', file);

    const res = await defHttp.post(
      {
        url: '/health/base/upload',
        params: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: function (progressEvent) {
          try {
            const jindu = (progressEvent.loaded / progressEvent.total).toFixed(2);
            const complete: any = parseFloat(jindu) * 100;
            if (callback) {
              callback(complete);
            }
          } catch {}
        },
      },
      { isTransformResponse: false },
    );
    if (res.success) {
      return j(res);
    } else {
      return j({ success: false, msg: res.msg || '上传失败' });
    }
  });
};

//get请求 使用 $fn.get(...)
export const get = (url: string, params?: object, headers?: any) => {
  return defHttp.get({ url, params, headers }, { isTransformResponse: false });
};

//get请求 使用 $fn.post(...)
export const post = (url: string, params?: object, headers?: any) => {
  return defHttp.post({ url, params, headers }, { isTransformResponse: false });
};
