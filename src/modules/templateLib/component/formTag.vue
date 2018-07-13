<template>
    <div class="formTag">
        <p class="articleText">标签</p>
        <div class="tagCont">
            <ul>
                <li v-for="(item,index) in tagList" :key="index" :class="{'addTag':item.addTag}"  >{{item.tagName}}<i c-show="item.addTag" @click.stop="removeTagList(index)"></i></li>
                <!--<li class="active">住院</li>
                <li>住院</li>-->
                <!--<li class="addTag">住院</li>-->
            </ul>
            <div class="tagInput">
                <div class="tagInputCont"> <input type="text" placeholder="输入新标签" v-model="appendTagName" @keydown.enter="appendTagList"/><i v-text="(10-appendTagName.length)"></i></div>
                <p @click.stop="appendTagList">添加</p>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "form-tag"
    }
</script>

<style scoped>

</style>
