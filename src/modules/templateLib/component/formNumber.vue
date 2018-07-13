<template>
    <div class="formNumber formCommon">
        <p class="articleText">编号</p>
        <div class="selectCont" @click.stop="toggleSelect('hospitalSelect')"><span>住院号</span>
            <ul class="selectOption" v-show="hospitalSelect">
                <li v-for="(item,index) in admissionNumList" :key='index' v-text="item.admissionNum" @click.stop="selectHospital(item)"></li>
            </ul>
        </div>
        <input class="inputCont" type="text" placeholder="请输入" v-model="admissionNum" readonly="readonly"/>
    </div>
</template>

<script>
    export default {
        name: "form-number"
    }
</script>

<style scoped>

</style>
