<template>
    <div>
        <header class='header'>
            <div class="cont">
                <img class='profile-image' src='/images/profile.jpg'></img>
                <div class="profile-content">
                    <h1>{{name}}</h1>
                    <h1>{{description}}</h1>
                    <ul class="social-icon"></ul>
                </div>
                <a href="#" class="btn-contact">
                    <i class="icon-quill"></i>&nbsp;我的简历
                </a>
            </div>
        </header>
        <div class="test" v-format-date='{date:date,pattern:"yyyy-MM-dd"}'></div>
        <div class="section-wapper">
            <div class="row">
                <div class="left-box">
                    <div class="section-inner">
                        <h2>文章</h2>
                        <transition-group name='test'>
                            <div class="article" v-for='(a,index) in articles' :key='"article"+index'>
                                <h3 class="article-title">
                                    <router-link :to='"/article/details/"+a._id'>{{a.title||'无标题'}}</router-link>  
                                </h3>
                                <p class="article-des">{{a.description||'暂时没有任何描述...'}}</p> 
                                <ul class="article-oper">
                                    <li>分类:{{a.category.join(',')}}</li>
                                    <li>发表时间:{{getDate(a.createTime)}}</li> 
                                    <li><a href="#">{{a.pv}}个浏览</a></li>
                                    <li>{{a.review}}条评论</li>
                                </ul>
                            </div>	
                        </transition-group>
                        
                    </div>
                </div>
                <div class="right-box">
                    <div class="section-inner">
                        <ul class="info">
                            <li><i class="icon-location"></i>{{address}}</li>
                            <li><i class="icon-link"></i>{{email}}</li>
                        </ul>
                    </div>
                    <div class="section-inner">
                        <h2>分类</h2>
                        <ul class="category">
                            <li v-for='c in categories'>
                                <a href="#">{{c.name}}
                                <span class="badge">{{c.articles.length}}</span></a>
                            </li>
                                
                        </ul>
                    </div>
					<div class="section-inner">
                        <h2>推荐</h2>
                        <ul class="recommend">
                            <li v-for='r in recommends'>
                                <a :href = 'r.url' target='_blank'>
                                    <i class='icon-link'></i>
								    {{r.name}}
                                </a>
										
                            </li>
									
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data:function(){
            return{
                name:'',
                description:'',
                address:'',
                email:'',
                articles:[],
                categories:[],
                recommends:[],
                date:''
            }
        },
        created:function(){
            this.date = new Date();
            hl.ajax.get('/user/info',{},
                (json)=>{
                    this.name = json.data.name;
                    this.description = json.data.description;
                    this.address = json.data.address;
                    this.email = json.data.email;
                },
                (str)=>{
                    console.log(str);
                });
            hl.ajax.get('/articles',{},
                (json)=>{
                    if(json.success)
                        this.articles = json.data;
                },
                (str)=>{
                    console.log(str);
                });
            hl.ajax.get('/categories',{},
                (json)=>{
                    if(json.success)
                        this.categories = json.data;
                },
                (str)=>{
                    console.log(str);
                });
            hl.ajax.get('/recommends',{},
                (json)=>{
                    if(json.success)
                        this.recommends = json.data;
                },
                (str)=>{
                    console.log(str);
                });
        },
        methods:{
            getDate:function(date){
                return hl.date.format(date,'yyyy-MM-dd');
            }
        }
    }
</script>

<style lang='less' scoped>
    @import '../../../styles/user/index.less';
    a{
        text-decoration:none;
    }
    .test-enter,.test-leave-active{
        margin-top: 100px;
        opacity: 0;
    }
    .test-enter-active,.test-leave-active{
        transition: all .5s ease-in;
        transition-delay:.1s;
    }
</style>