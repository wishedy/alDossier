<template>
    <section class="alEmr-searchInput">
        <input type="text" placeholder="搜索病例信息">
        <b></b>
    </section>
</template>
<script>
    export default {
        data(){
            return{
                input:''
            }
        }
    }
</script>
<style lang="scss">
    .alEmr-searchInput{
        float: left;
        margin: 20px 0;
        width: 180px;
        height: 34px;
        line-height: 34px;
        position: relative;
        border: 1px solid #B8C1CE;
        border-radius: 20px;
        box-sizing: border-box;
        input{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            border: none;
            height: 100%;
            width: 140px;
            margin-left: 13px;
            color: #333;
        }
        b{
            position: absolute;
            z-index: 3;
            top: 9px;
            right: 8px;
            width: 14px;
            height: 14px;
            background: transparent url(//img10.allinmd.cn/v3/message/top_search.png) center center no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
        }
    }
</style>
