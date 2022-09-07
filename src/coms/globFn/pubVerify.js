//验证方式
export const pubVerify = {
  //邮箱
  isEmail: (s) => {
    return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
  },
  //手机号码
  isMobile: (s) => {
    return /^1[0-9]{10}$/.test(s);
  },
  //电话号码
  isPhone: (s) => {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
  },
  //URL地址
  isURL: (s) => {
    return /^http[s]?:\/\/.*/.test(s);
  },
  isCard: (s) => {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(s);
  },

  idCard: (card) => {
    let flag = false;
    if (card.length === 15) {
      let reg =
        /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      flag = reg.test(card);
    } else {
      var weightFactor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验码
      var checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

      var code = card + '';
      var last = card[17]; // 最后一位

      var seventeen = code.substring(0, 17);

      // ISO 7064:1983.MOD 11-2
      // 判断最后一位校验码是否正确
      var arr = seventeen.split('');
      var len = arr.length;
      var num = 0;
      for (var i = 0; i < len; i++) {
        num = num + arr[i] * weightFactor[i];
      }

      // 获取余数
      var resisue = num % 11;
      var lastNo = checkCode[resisue];

      // 格式的正则
      // 正则思路
      var idcardPatter =
        /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

      // 判断格式是否正确
      var format = idcardPatter.test(card);

      // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
      flag = !!(last === lastNo && format);
    }
    return flag;
  },
  //根据身份证获取年龄-性别-生日
  idCardInfo: (idCard) => {
    if (!idCard) return {};
    let sex = null;
    let birth = null;
    let myDate = new Date();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let age = 0;

    if (idCard.length === 18) {
      age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
      sex = idCard.substring(16, 17);
      birth =
        idCard.substring(6, 10) + '年' + idCard.substring(10, 12) + '月' + idCard.substring(12, 14);
      if (
        idCard.substring(10, 12) < month ||
        (idCard.substring(10, 12) === month && idCard.substring(12, 14) <= day)
      )
        age++;
    }
    if (idCard.length === 15) {
      age = myDate.getFullYear() - idCard.substring(6, 8) - 1901;
      sex = idCard.substring(13, 14);
      birth =
        '19' +
        idCard.substring(6, 8) +
        '年' +
        idCard.substring(8, 10) +
        '月' +
        idCard.substring(10, 12);
      if (
        idCard.substring(8, 10) < month ||
        (idCard.substring(8, 10) === month && idCard.substring(10, 12) <= day)
      )
        age++;
    }

    if (sex % 2 === 0) sex = 0; // 性别代码 1代表男，0代表女，暂时不涉及其他类型性别
    else sex = 1;
    return { age, sex: sex == 1 ? '男' : '女', birth };
  },
};
