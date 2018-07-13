<template>
    <div class="formInputAge formCommon">
        <p class="articleText"><i>*</i>年龄</p>
        <input class="inputText"  type="text" v-model="ageYear" readonly="readonly"/>
        <span>岁</span>
        <input class="inputText" type="text"  v-model="ageMonth" readonly="readonly"/>
        <span>月</span>
        <input class="inputText" type="text"  v-model="ageDay" readonly="readonly"/>
    </div>
</template>

<script>
    export default {
        name: "form-input-age"
    }
</script>

<style scoped>

</style>
