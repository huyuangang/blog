<template>
    <div class="content">
            <div class="row">
                <main class='main'>
                    <article class='article' v-for='a in articles'>
                            <router-link class='title' :to='"/note/"+a._id'>{{a.title||'无标题'}}</router-link>
                            <p class='desc'>{{a.description||'暂时没有任何描述...'}}</p>
                            <div class="meta">
                                <span>分类：{{a.category.join(',')}}</span>
                                <span>发表时间：<format-date :date='a.createTime' format='yyyy-MM-dd'></format-date></span>
                                <span>浏览：{{a.pv}}</span>
                                <span>评论：{{a.review}}</span>
                            </div>
                    </article>
                </main>
                <aside class='aside'>
                    <div class="inner">
                        <h3 class="title">最近文章</h3>
                        <ul class='list'>
                            <li v-for='a in articles'><router-link class='title' :to='"/note/"+a._id'>{{a.title||'无标题'}}</router-link></li>
                        </ul>
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
    import axios from 'axios';
    import formatDate from '@components/format-date.vue';
    export default{
        components:{formatDate},
        data:function(){
            return{
                articles:[],
                categories:[],
                recommends:[]
            }
        },
        activated:function(){
            axios.get('/api/notes')
                .then((res)=>{
                    if(res.data.success)
                        this.articles = res.data.data;
                })
                .catch((e)=>{
                    console.log(e);
                });
            axios.get('/api/categories')
                .then((res)=>{
                    if(res.data.success)
                        this.categories = res.data.data;
                })
                .catch((e)=>{
                    console.log(e);
                });
            axios.get('/api/recommends').then((res) => {
                console.log(res.data)
            }).catch((e)=>{
                console.log(e);
            })
        }
    }
</script>

<style lang='less' scoped>
    @import '~@styles/user/index.less';
</style>