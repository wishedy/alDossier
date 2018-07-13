<template>
    <aside class="surgeryCure">
        <div class="formSelectS formCommon">
            <div class="articleText">{{data.menuName}}</div>
            <div class="cont">
                <div class="selectCont"><span>2013</span>
                    <ul class="selectOption" style="display: none">
                        <li>2014</li><li>2015</li><li>2013</li><li>2014</li>
                    </ul>
                </div>
                <b>年</b>
                <div class="selectCont width83"><span>05</span>
                    <ul class="selectOption" style="display: none">
                        <li>2014</li><li>2015</li><li>2013</li><li>2014</li>
                    </ul>
                </div>
                <b>月</b>
                <div class="selectCont width83"><span>10</span>
                    <ul class="selectOption" style="display: none">
                        <li>2014</li><li>2015</li><li>2013</li><li>2014</li>
                    </ul>
                </div>
                <b>日</b>
                <div class="selectCont width83"><span>10</span>
                    <ul class="selectOption" style="display: none">
                        <li>2014</li><li>2015</li><li>2013</li><li>2014</li>
                    </ul>
                </div>
                <b>时</b>
                <div class="selectCont width83"><span>10</span>
                    <ul class="selectOption" style="display: none">
                        <li>2014</li><li>2015</li><li>2013</li><li>2014</li>
                    </ul>
                </div>
                <b>分</b>
            </div>
        </div>
    </aside>
</template>

<script>
    export default {
        name: "surgery-cure",
        props:['data']
    }
</script>

<style scoped>
    .newCases .surgeryCure{
        padding-bottom: 0;
    }
    .newCases .surgeryCure .selectCont{
        width: auto;
    }
    .selectCont{
        padding: 0 20px 0 10px;
    }
    .selectCont:after{
        right: 5px;
    }
    .newCases .surgeryCure .formSelectS b{
        margin: 0 10px;
    }
</style>
