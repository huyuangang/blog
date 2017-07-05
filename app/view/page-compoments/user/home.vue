<template>
    <div class='home'>
        <div class='main' v-if='notes.length > 0'>
            <article class='article' v-for='n in notes'>
                <router-link class='title' :to='"/note/"+n._id'>{{n.title||'无标题'}}</router-link>
                <p class='desc'>{{n.description||'暂时没有任何描述...'}}</p>
                <div class="meta">
                    <span><i class='fa fa-tag'>&nbsp;&nbsp;</i>{{n.category.join(',')}}</span>
                    <span><i class='fa fa-clock-o'>&nbsp;</i><format-date :date='n.createTime' format='yyyy-MM-dd'></format-date></span>
                    <span><i class='fa fa-eye'>&nbsp;&nbsp;</i>{{n.pv}}</span>
                    <span><i class='fa fa-commenting'>&nbsp;&nbsp;</i>{{n.review}}</span>
                </div>
            </article>
        </div>
        <div class="main" v-else>
            暂时没有笔记。。。
        </div>
        <div class='aside'>
            <div class="inner">
                <h2 class='inner-title'>最近文章</h2>
                <ul v-if='recent.length > 0'>
                    <li v-for='r in recent' class='inner-list-item'>
                        <router-link class='title' :to='"/note/"+r._id'>{{r.title||'无标题'}}</router-link>
                    </li>
                </ul>
                <p class='no-text' v-else>博主很懒，最近一周没有发表文章</p>
            </div>
            <div class="inner">
                <h2 class='inner-title'>文章分类</h2>
                <ul v-if='categories.length > 0'>
                    <li v-for='c in categories' class='inner-list-item'>
                        <span>{{c.name}}</span>
                        <span class='badge'>{{c.articles.length}}</span>
                    </li>
                </ul>
                <p class='no-text' v-else>暂无分类</p>
            </div>
            <div class="inner">
                <h2 class="inner-title">朋友链接</h2>
                <ul v-if='recommends.length > 0'>
                    <li v-for='r in recommends' class='inner-list-item'>
                        <a :href="r.url" target='_blank'>{{r.name}}</a>
                    </li>
                </ul>
                <p class='no-text' v-else>暂无链接</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {getNotes, getCates, getRecommends} from '../../../public/js/api.js'
    import formatDate from '@components/format-date.vue';
    export default{
        data() {
            return {
                notes: [],  //笔记
                recent: [], //最近一周发表
                categories: [],  //分类
                recommends: []   //推荐
            }
        },
        components: { formatDate },
        activated () {
            getNotes()
                .then((res)=>{
                    if(res.data.success)
                        this.notes = res.data.data;
                        let nowDate = new Date();
                        this.recent = this.notes.filter((item)=>{
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
            getRecommends()
                .then((res) => {
                    if(res.data.success)
                        this.recommends = res.data.data;
                })
                .catch((e) => {
                    console.log(e);
                })
        },
        methods: {
            
        }
    }
</script>

<style lang='less' scoped>
    @import '~@styles/color.less';
    @media screen and(min-width: 640px){
        .home{
            width: 960px;
            margin: auto;
            margin-top: 60px;
            &:after{
                content: "";
                display: table;
                clear: both;
            }
            .main{
                float: left;
                width: 700px;
                background: @white;
                .article{
                    border-top: 1px solid @main-back;
                    padding: 15px 20px;
                    box-sizing: border-box;
                    .title{
                        font-size: 20px;
                        font-weight: bold;
                        color: @black;
                        margin: 5px 0 10px;
                        display: block;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                    .desc{
                        color: @link2;
                        margin-bottom: 10px;
                        font-size: 16px;
                    }
                    .meta{
                        font-size: 14px;
                        span{
                            display: inline-block;
                            margin-right: 15px;
                        }
                    }
                }
            }
            .aside{
                float: right;
                width: 240px;
                .inner{
                    background: @white;
                    margin-bottom: 20px;
                    padding: 10px;
                    box-sizing: border-box;
                    .inner-title{
                        padding-bottom: 5px;
                        font-size: 16px;
                        color: @black;
                    }
                    ul{
                        margin-left: 5px;
                    }
                    .inner-list-item{
                        padding: 5px 0;
                        font-size: 14px;
                        a{
                            &:hover{
                                color: @main-blue;
                                text-decoration: underline;
                            }
                        }
                        .badge{
                            float: right;
                        }
                    }
                    .no-text{
                        margin-left: 5px;
                    }
                }
            }
        }
    }
    @media screen and(max-width: 640px){
        .home{
            padding: 10px;
            .aside{
                display: none;
            }
            .main{
                .article{
                    padding: 10px;
                    margin: 10px 0;
                    background: #fff;
                    border: 1px solid #eee;
                    .title{
                        font-weight: 600;
                        font-size: 18px;
                    }
                    .desc{
                        color: #aaa;
                        margin: 5px 0;
                    }
                    .meta{
                        color: #aaa;
                        font-size: 12px;
                        span{
                            display: inline-block;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }
</style>