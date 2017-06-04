<template>
    <div class="content">
        <div class="row">
            <div class='main'>
                <transition-group name='article'>
                    <article class='article' v-for='a in articles' :key='a._id'>
                            <router-link class='title' :to='"/note/"+a._id'>{{a.title||'无标题'}}</router-link>
                            <p class='desc'>{{a.description||'暂时没有任何描述...'}}</p>
                            <div class="meta">
                                <span>分类：{{a.category.join(',')}}</span>
                                <span>发表时间：<format-date :date='a.createTime' format='yyyy-MM-dd'></format-date></span>
                                <span>浏览：{{a.pv}}</span>
                                <span>评论：{{a.review}}</span>
                            </div>
                    </article>
                </transition-group>
            </div>
            <aside class='aside'>
                <div class="inner">
                    <h3 class="title">最近文章</h3>
                    <ul class='list' v-if='recent.length > 0'>
                        <li v-for='r in recent'><router-link class='title' :to='"/note/"+r._id'>{{r.title||'无标题'}}</router-link></li>
                    </ul>
                    <p v-else>博主很懒，最近一周都没发表文章...</p>
                </div>
                <div class="inner">
                    <h3 class="title">分类</h3>
                    <ul class='list'>
                        <li v-for='c in categories'>
                            <a class='cate-item' href="#">{{c.name}}</a>
                            <span class="badge">{{c.articles.length}}</span>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
</template>


<script>
    import {getNotes, getCates} from '../../../public/js/api.js'
    import formatDate from '@components/format-date.vue';
    export default{
        components:{formatDate},
        data:function(){
            return{
                articles:[],
                categories:[],
                recommends:[],
                recent:[],
                show: true
            }
        },
        activated (){
            getNotes()
                .then((res)=>{
                    if(res.data.success)
                        this.articles = res.data.data;
                        let nowDate = new Date();
                        this.recent = this.articles.filter((item)=>{
                            let date = new Date(item.createTime)
                            return nowDate - date.getTime() < 1000*60*60*24*7;
                        })
                })
                .catch((e)=>{
                    console.log(e);
                });
            getCates()
                .then((res)=>{
                    if(res.data.success)
                        this.categories = res.data.data;
                })
                .catch((e)=>{
                    console.log(e);
                });
        },
        deactivated () {
            this.articles = [];
        }
    }
</script>

<style lang='less' scoped>
    @import '~@styles/user/index.less';
    .article-enter-active{
        transition:all .5s ease-out;
    }
    .article-enter{
        margin-top: 100px;
    }
</style>