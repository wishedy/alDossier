<template>
    <div class="alEmr-mainInner newCases">
       <upload-column :uploadColumn="uploadData"></upload-column>
       <upload-column :uploadColumn="uploadData"></upload-column>
    </div>
</template>
<script>
    import uploadColumn from '~components/uploadColumn/uploadColumn'
    export default {
        name: 'index-app',
        data() {
            return {
                uploadData:{
                    menuId:'1511494149727',
                    caseId:'1531547831333',
                    ImgList:[
                        'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png',
                        'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png',
                        'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png'
                    ],
                    VideoList:[
                        'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png',
                        'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png',
                        'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png'
                    ],
                    textVal:'dfdsfasdafdsfsfs'
                }
            }
        },
        components: {
            uploadColumn,
        },
        async mounted() {

        },
        metaInfo: {
            title: '模块3'
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/base.scss";
    @import "../../assets/scss/pages/newCases.scss";
</style>
