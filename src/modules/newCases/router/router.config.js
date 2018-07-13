import baseInfo from "../components/baseInfo.vue";//基本信息
import comLibrary from "../components/comLibrary.vue";//基本信息
import chiefComplaint from "../components/chiefComplaint.vue";//主诉
import nowMedicalHistory from "../components/nowMedicalHistory.vue";//现病史
import passMedicalHistory from "../components/passMedicalHistory.vue";//既往史
import subjectCheck from "../components/subjectCheck.vue";//专科查体
import beforeSurgeryView from "../components/beforeSurgeryView.vue";//术前影像资料
import tentativeDiagnose from "../components/tentativeDiagnose.vue";//初步诊断
import surgeryCure from "../components/surgeryCure.vue";//手术治疗
import afterSurgeryView from "../components/afterSurgeryView.vue";//术后影像资料
import followUpRecord from "../components/followUpRecord.vue";//随访记录
import assemble from "../components/assemble.vue";//组装页面

export default {
    routes: [
        {
            path: "/baseInfo",
            component: baseInfo
        },
        {
            path: "/comLibrary",
            component: comLibrary
        },
        {
            path: '/assemble/:menuId',
            name: 'assemble',
            component: assemble
        },
        {
            path: "/chiefComplaint",
            component: chiefComplaint
        },
        {
            path: "/chiefComplaint",
            component: chiefComplaint
        },
        {
            path: "/followUpRecord",
            component: followUpRecord
        },
        {
            path: "/afterSurgeryView",
            component: afterSurgeryView
        },
        {
            path: "/surgeryCure",
            component: surgeryCure
        },
        {
            path: "/tentativeDiagnose",
            component: tentativeDiagnose
        },
        {
            path: "/beforeSurgeryView",
            component: beforeSurgeryView
        },
        {
            path: "/subjectCheck",
            component: subjectCheck
        },
        {
            path: "/passMedicalHistory",
            component: passMedicalHistory
        },
        {
            path: "/nowMedicalHistory",
            component: nowMedicalHistory
        },
        {
            path: "*",
            redirect: "/baseInfo"
        }
    ]
};
