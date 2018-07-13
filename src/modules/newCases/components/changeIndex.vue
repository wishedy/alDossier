<template>
    <div class="caseBottomBtn">
        <p class="casePrevBtn" @click.stop="changeIndex({pre:0})">上一步</p>
        <p class="caseNextBtn" @click.stop="changeIndex({pre:1})">下一步</p>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    export default {
        computed:{
            ...mapGetters(['pageIndex'])
        },
        methods:{
            ...mapActions(['changeIndex'])
        }
    }
</script>
