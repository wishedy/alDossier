<template>
    <div class="formSelect formCommon">
        <p class="articleText">{{data.menuName}}</p>
        <div class="selectCont">
            <span v-text="'请选择'"></span>
            <ul class="selectOption" v-if="affiliationSelect">
                <li v-for="(item,index) in data.sonList" :key="index" v-text="item.menuName"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "form-select",
        props:['data'],
        data(){
           return{
               affiliationSelect:false
           }
        },
        methods:{
            affSelect(){
                this.affiliationSelect=true;
            }
        }
    }
</script>

<style scoped>

</style>
