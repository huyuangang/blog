<template>
    <div class='index'>
        <div class="header">
            <nav class='header-nav'>
                <router-link to='/' class="nav-item">胡元港的前端笔记</router-link>
                <!--<router-link to='/notes' class="nav-item">笔记<span></span></router-link>
                <router-link to='/recommends' class="nav-item">友链<span></span></router-link>
                <router-link to='/other' class="nav-item">其他<span></span></router-link>-->
            </nav>
        </div>
        <div class='container'>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="less" scoped>
    @import '~@styles/color.less';
   .header{
       background: @main-blue;
       box-shadow: 0 5px 12px #aaa;
       .header-nav{
            font-size: 20px;
            color: @main-blue;
            width: 960px;
            margin: auto;
            height: 60px;
            line-height: 60px;
            letter-spacing: 2px;
            a{
                color: @white;
            }
       }
   }
</style>


