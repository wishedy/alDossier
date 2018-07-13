<template>
    <section class="alEmr-userLogo">
        <img src="/static/images/common/userLogo.png" alt="">
        <span>这是用户名</span>
    </section>
</template>
<script>
    export default {}
</script>
<style lang="scss">
    .alEmr-userLogo{
        float: left;
        margin: 18px 0 18px 15px;
        img{
            display: inline-block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            float: left;
        }
        span{
            display: inline-block;
            height: 40px;
            color:#B8C1CE;
            vertical-align: middle;
            line-height: 40px;
            float: left;
            margin-left: 10px;
        }
    }
</style>
