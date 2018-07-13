<template>
    <div class="formNumber formCommon">
        <p class="articleText">编号</p>
        <div class="selectCont"><span>住院号</span>
            <ul class="selectOption" v-show="false">
                <!--<li v-for="(item,index) in admissionNumList" :key='index' v-text="item.admissionNum"></li>-->
            </ul>
        </div>
        <input class="inputCont" type="text" placeholder="请输入" readonly="readonly"/>
    </div>
</template>

<script>
    export default {
        name: "form-number"
    }
</script>

<style scoped>

</style>
