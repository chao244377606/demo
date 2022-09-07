/**
 * 阿里云oss上传工具
 */
import OSS from 'ali-oss';

const config = {
  region: '',
  secure: true,
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
  // cname: true,文档
};

/**
 * 配置
 */
const init = () => {
  return new OSS(config);
};

/**
 * 生成uuid
 */
const guid = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(4).substring(1);
  };
  return S4();
};

/**
 * 修改文件名字
 */
const fileName = (ossPath, file) => {
  const arr = file.name.split('.');
  const uuid = guid();
  if (arr.length > 1) {
    return ossPath + '/' + arr[0] + uuid + '.' + arr[arr.length - 1];
  } else {
    return ossPath + '/' + arr[0] + uuid;
  }
};

/**
 * 修改文件名字
 */
const fileBlobName = (ossPath, name) => {
  const arr = name.split('.');
  const uuid = 'oss' + guid();
  if (arr.length > 1) {
    return ossPath + '/' + uuid + '.' + arr[arr.length - 1];
  } else {
    return ossPath + '/' + uuid;
  }
};

/**
 * 上传文件
 */
const ossPut = (ossPath, file) => {
  return new Promise((resolve, reject) => {
    const objectName = fileName(ossPath, file);
    init()
      .put(objectName, file)
      .then(({ res, url }) => {
        if (res && res.status == 200) {
          console.log('阿里云OSS上传文件成功回调', res, url);
          resolve(url);
        }
      })
      .catch((err) => {
        console.log('阿里云OSS上传文件失败回调', err);
        reject(err);
      });
  });
};

/**
 * 上传文件
 */
const ossPutBlob = (ossPath, file, name) => {
  return new Promise((resolve, reject) => {
    const objectName = fileBlobName(ossPath, name);
    init()
      .put(objectName, file)
      .then(({ res, url }) => {
        if (res && res.status == 200) {
          console.log('阿里云OSS上传文件成功回调', res, url);
          resolve(url);
        }
      })
      .catch((err) => {
        console.log('阿里云OSS上传文件失败回调', err);
        reject(err);
      });
  });
};

/**
 * 下载文件
 */
const ossGet = (name) => {
  return new Promise((resolve, reject) => {
    init()
      .get(name)
      .then(({ res }) => {
        if (res && res.status == 200) {
          console.log('阿里云OSS下载文件成功回调', res);
          resolve(res);
        }
      })
      .catch((err) => {
        console.log('阿里云OSS下载文件失败回调', err);
        reject(err);
      });
  });
};

export default { ossPut, ossGet, ossPutBlob };
