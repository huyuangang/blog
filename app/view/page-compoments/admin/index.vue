<template>
    <div>
        <div class="top">
			<div class="header">
                <a href='/' class="nav-item">胡元港的前端笔记</a>
            </div>
		</div>
        <div class="left-nav">
            <ul>
                <li v-for='t in topNav'>
                   <router-link :to='t.urls' class="nav-item"><i :class='t.icon'></i>&nbsp;&nbsp;{{t.name}}</router-link>
                </li>
            </ul>
        </div>
		<div class="section-wapper">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
		</div>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                topNav: [
                    { name: '文章管理', urls: '/admin/article', icon: 'fa fa-file' },
                    { name: '分类管理', urls: '/admin/category', icon: 'fa fa-tags' },
                    { name: '推荐管理', urls: '/admin/recommend', icon: 'fa fa-list' },
                    { name: '日志管理', urls: '/admin/logs', icon: 'fa fa-pencil-square-o' }
                ]
            }
        }
    }
</script>


<style lang="less" scoped>
    @import '~@styles/color.less';
    .top{
       background: @main-blue;
       box-shadow: 0 5px 12px #aaa;
       position: fixed;
       top: 0;
       left: 0;
       right: 0;
       z-index: 1;
       .header{
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
   .left-nav{
       position: fixed;
       top: 60px;
       bottom: 0;
       left: 0;
       background: @nav-back;
       padding: 10px;
       box-shadow: 5px 0 12px #aaa;
       z-index: 1;
       .nav-item{
           display: inline-block;
           width: 150px;
           padding: 10px 0;
           padding-left: 10px;
           color: @nav-link;
           &:hover{
               color: @nav-link-hover;
               font-size: 1.1em;
           }
       }
       .router-link-active{
            color: @nav-link-hover;
            font-size: 1.1em;
       }
   }
   .section-wapper{
       position: fixed;
       top: 60px;
       left: 180px;
       right: 0;
       bottom: 0;
       overflow: auto;
       padding: 20px;
   }
</style>