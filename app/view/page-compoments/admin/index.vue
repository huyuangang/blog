<template>
    <div>
        <div class="top">
			<nav class="nav">
                <a class='home' href="/">首页</a>
                <ul>
                    <li v-for='t in topNav'>
					    <router-link  :to="t.urls">{{t.name}}</router-link>
                    </li>
                </ul>
			</nav>
		</div>
		<div class="section-wapper">
            <transition name='view' mode='out-in'>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
		</div>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                topNav: [
                    { name: '文章管理', urls: '/admin/article' },
                    { name: '分类管理', urls: '/admin/category', },
                    { name: '推荐管理', urls: '/admin/recommend' },
                    { name: '日志管理', urls: '/admin/logs' },
                    { name: '样例管理', urls: '/admin/demo' },
                    { name: '新建文章', urls: '/admin/article/new'}
                ]
            }
        }
    }
</script>


<style lang="less" scoped>
    .top{
        margin-top: 50px;
        .home{
            font-size: 30px;
        }
        .nav{
            width: 1140px;
            margin:auto;
            border-bottom: 1px solid #e7e7e7;
            padding-bottom: 25px;
            ul{
                float:right;
                li{
                    display: inline;
                    font-size: 20px;
                    margin: 0 10px;
                }
            }
        }
    }
    .section-wapper {
        width: 1140px;
        margin: auto;
        margin-top: 50px;
    }
    .view-enter{
        transform:translate(0,200px);
        opacity: 0;
    }
    .view-leave-active{
        transform:translate(0,-200px);
        opacity: 0;
    }
    .view-enter-active,.view-leave-active{
        transition: all .2s ease-in;
    }
</style>