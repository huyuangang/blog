<template>
    <div class='index'>
        <div class="top">
            <nav class='nav'>
                <router-link to='/' class="nav-item">首页<span></span></router-link>
                <router-link to='/notes' class="nav-item">笔记<span></span></router-link>
                <router-link to='/recommends' class="nav-item">友链<span></span></router-link>
                <router-link to='/other' class="nav-item">其他<span></span></router-link>
                <div class='search'>
                    搜索：<input type="text">
                </div>
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
    .index{
        .top{
            margin-top: 50px;
            .nav{
                width: 1140px;
                margin:auto;
                border-bottom: 1px solid #e7e7e7;
                padding-bottom: 25px;
                .nav-item{
                    margin: 0 10px;
                    color: #000;
                    font-size: 24px;
                    position: relative;
                    display: inline-block;
                    span{
                        position:absolute;
                        left: 0;
                        top: 120%;
                        width: 0;
                        height: 1px;
                        background: #000;
                        display: inline-block;
                        transition: all .4s ease-in-out;
                    }
                    &:hover > span {
                        width: 48px;
                    }
                }
                .search{
                    float: right;
                    margin-right: 10px;
                    font-size: 20px;
                    input{
                        border: none;
                        outline:none;
                        border-bottom: 1px solid #aaa;
                    }
                }
            }
        }
        .container{
            width: 1140px;
            margin:auto;
        }
    }
</style>


