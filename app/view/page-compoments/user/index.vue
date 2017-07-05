<template>
    <div class='index'>
        <div class="header">
            <nav class='header-nav'>
                <router-link to='/' class="nav-item">胡元港的前端笔记</router-link>
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
            height: 60px;
            line-height: 60px;
            letter-spacing: 2px;
            a{
                color: @white;
            }
        }
    }
    @media screen and(min-width: 1000px){
        .header{
            .header-nav{
                width: 960px;
                margin: auto;
            }
        }
    }
    @media screen and(max-width: 1000px){
        .header{
            .header-nav{
                margin-left: 20px;
            }
        }
    }
   
</style>


