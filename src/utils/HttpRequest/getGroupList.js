/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by YuxiYang on 2018/7/18.
 */
import ajax from "~utils/ajax.js";

const XHRList = '/call/caseFolder/team_baseinfo/getMapListByCustomerId/';

export default function getGroupList(param) {
    return new Promise((resolve, reject) => {
        ajax({
            url: XHRList,
            method: "POST",
            dataType:"json",
            data: {
                customerId:param.customerId
            },
            done(data) {
                resolve(data);
                console.log("调用成功");
            },
            fail(err) {
                console.log("调用失败");
                reject(err);
            }
        })
    })
}

