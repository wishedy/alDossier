<template>

    <div class="recommend">
        <h4>为您推荐（14）</h4>
        <ul>
            <li v-for="person in people">
                <p class="userImg"><img src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"/> </p>
                <p class="userName">{{person.name}}</p>
                <p class="userTitle">{{person.userTitle}}</p>
                <p class="userHospital">{{person.userHospital}}</p>
                <p class="check"></p>
            </li>
        </ul>
    </div>

</template>
<script>
import axios from 'axios';
import api from '~api'
export default {
    name: 'index-app',
    data() {
        return {
            people: [{
                imgUrl:'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png',
                name: 'Jack',
                userTitle: '副主任医师',
                userHospital:'中国人民解放军总医院',
                sex: 'Male'
            }, {
                imgUrl:'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png',
                name: 'Jack11',
                userTitle: '副主任医师',
                userHospital:'中国人民解放军总医院',
                sex: 'Male'
            }, {
                imgUrl:'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png',
                name: 'Jack',
                userTitle: '副主任医师',
                userHospital:'中国人民解放军总医院',
                sex: 'Male'
            }, {
                imgUrl:'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png',
                name: 'Jack',
                userTitle: '副主任医师',
                userHospital:'中国人民解放军总医院',
                sex: 'Male'
            }]
        }
    },
    components: {
    },
    async mounted() {
        axios({
            method: 'post',
            url: '/call/ad/position/profile/getMapList/',
            data: {"firstResult":0,"maxResult":10,"visitSiteId":1,"channelId":68,"isIndex":1,"platformId":"1","customerId":"1399252409974"},
            transformRequest: [function (data) {
                return "paramJson=" + JSON.stringify(data);
            }],
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 30000
        }).then(function (res) {
            console.log(res)
        });

    },
    metaInfo: {
        title: '团队设置'
    }
}
</script>

