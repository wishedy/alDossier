//全站正则判断
const regularTest = {
    testNum(val){
        //判断数字
        return (/^\d+$/g).test(val);
    },
    testName(val){
        //判断名字，涵盖少数民族
        return (/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{0,20}$/).test(val);
    },
    testPhoneNum(val){
        //判断手机号 包含16、17号段
        return (/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(val);
    },
    testID(val){
        //判断身份证
        return (/(^\d{15}$)|(^\d{17}([0-9]|X)$)/).test(val);
    }
};
export default  regularTest;
