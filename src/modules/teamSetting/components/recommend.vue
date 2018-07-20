<template>

    <div class="recommend" v-show="!recommendOnOff">
        <h4>为您推荐（{{recommendList.length+1}}）</h4>
        <ul>
            <li v-for="(person,index) in recommendList">
                <div>
                    <!--<p class="userImg"><img :src="person.customerAtt.logoUrl"/> </p>-->
                    <p class="userImg"><img src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"/> </p>
                    <p class="userName">{{person.recommCustomerPundits.customerName,5|dateNameChange}}</p>
                    <p class="userTitle">{{person.recommCustomerPundits.medicalTitleShow,4|dateNameChange}}</p>
                    <p class="userHospital">{{person.recommCustomerPundits.company,7|dateNameChange}}</p>
                </div>
                <p class="check" :class="{active:indexItem.indexOf(index)!=-1}" @click.stop="itemCli({name:person.recommCustomerPundits.customerName,cid:person.recommCustomerPundits.customerId,index:index})"></p>
            </li>
        </ul>
    </div>

</template>
<script>
import comm from '../../../utils/comm.js';
import axios from 'axios';
import api from '~api'
export default {
    name: 'index-app',
    props:['nameDel'],
    data() {
        return {
            recommendOnOff:false,
            indexItem:[],
            nameItem:[],
            recommendList:[],
        }
    },
    components: {
    },
    watch:{
        nameDel(){
            // for(let i=0;i<this.nameItem.length;i++){
            //     if(this.nameItem[i].cid==this.nameDel){
            //         this.indexItem.splice(i, 1)
            //     }
            // }
            if(this.nameItem.indexOf(this.nameDel)!=-1){
                // console.log(this.nameItem)
                // console.log(this.indexItem)
                // console.log(this.nameItem.indexOf(this.nameDel))
                this.indexItem.splice(this.nameItem.indexOf(this.nameDel), 1)
                this.nameItem.splice(this.nameItem.indexOf(this.nameDel), 1)
            }

        }
    },
    methods:{
        itemCli(obj){
            let t = this;
            if(t.indexItem.indexOf(obj.index)!=-1){
                //移除元素
                t.indexItem.splice(t.indexItem.indexOf(obj.index), 1);
                t.nameItem.splice(t.indexItem.indexOf(obj.index), 1);
                t.$emit('PeopleList',{name:obj.name,add:false,cid:obj.cid});
            }else {
                //选中元素
                t.indexItem.push(obj.index);
                t.nameItem.push(obj.cid);
                t.$emit('PeopleList',{name:obj.name,add:true,cid:obj.cid});
            }
        },
    },
    filters:{
        dateTypeChange:function (date) {
            if(date){
                let newDate = date.split(",");
                newDate=newDate[0].split('_');
                return newDate[2];
            }
        },
        dateNameChange:function (txt,num) {
            if(txt.length>num+1){
                txt = txt.substring(0,num)+'...';
                console.log(txt.length);
                return txt;
            }else{
                return txt;
            }
        }
    },
    async mounted() {
        let t=this;
        comm.ajax2({
            url: '/call/customer/pundits/getRecommendedmayKnowPundits/',
            type: "post",
            data: {
                paramJson:JSON.stringify({"sessionCustomerId":"1399252409974","pageIndex":1,"pageSize":5,"logoUseFlag":10,"platformId":"1","sortType":4})
            },
            success:function(res){
                t.recommendList=res.responseObject.responseData.data_list;
                if(t.recommendList==''){

                }
            }
        })

    },
    metaInfo: {
        title: '团队设置'
    }
}
</script>

