<template>
    <div>
        <div class="top">
			<div class="top-sign"><a href="/">HYG's Blog</a></div>
			<router-link class='to-new' to="/admin/article/new">新建文章</router-link>
			<ul class="top-nav">
				<li v-for='t in topNav'>
					<router-link :to="t.urls">{{t.name}}</router-link>
				</li>
			</ul>
			
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
                    { name: '样例管理', urls: '/admin/demo' },
                    { name: '杂记管理', urls: '#' }
                ]
            }
        }
    }
</script>


<style lang="" scoped>
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