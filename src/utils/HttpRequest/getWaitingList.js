/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by YuxiYang on 2018/7/18.
 */
import ajax from "~utils/ajax.js";

const XHRList = '/call/caseFolder/team_member/getMapListByTeamId/';

export default function getGroupList(param) {
    return new Promise((resolve, reject) => {
        ajax({
            url: XHRList,
            method: "POST",
            dataType:"json",
            data: {
                teamId:param.teamId,
                sortType:2,
                firstResult:param.firstResult,
                maxResult:param.maxResult,
                teamSelectType:param.teamSelectType,
            },
            done(data) {
                resolve(data);
            },
            fail(err) {
                reject(err);
            }
        })
    })
}

