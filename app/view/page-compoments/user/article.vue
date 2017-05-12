<template>
    <div class='detail'>
        <nav class='nav'><router-link to="/">主页</router-link>&nbsp;&gt;&nbsp;文章详情页</nav>
        <header class="header">
            <h1>{{title||'无标题'}} <span>(&nbsp;{{getDate(createTime,'yyyy/MM/dd')}}&nbsp;)</span></h1>
            <p>{{description||'暂时没有任何描述...'}}</p>
        </header>
        <div class="section-wapper">
            <div class="content" v-html='content'></div>
        </div>
    </div>
</template>


<script>
    export default{
        data:function(){
            return{
                title:'',
                description:'',
                content:'',
                createTime:''
            }
        },
        activated:function(){
            var id = this.$route.params.id;
            hl.ajax.get('/article/details/'+id+'/data',{},
                (json)=>{
                    if(json.success){
                        var data = json.data;
                        this.title = data.title;
                        this.description = data.description;
                        this.content = data.html;
                        this.createTime = data.createTime;
                    }
                }
            )
        },
        methods:{
            getDate:function(date,formatStr){
                return hl.date.format(date,formatStr);
            }
        }
    }
</script>

<style lang="less">
    .detail{
        .nav{
            padding:15px 10px 15px 50px;
            border-bottom:1px solid #aaa;
            color:#fff;
            background:#778492;
            a{
                color:#dae3e7;
                &:hover{
                    color:#fff;
                }
            }
        }
        .header{
            width: 768px;
            margin: auto;
            margin-top:40px;
            margin-bottom:20px;
            padding-bottom:10px;
            border-bottom:2px solid #aaa;
            h1{
                font-size:2.6em;
                span{
                    color:#666;
                }
            }
        }
        p{
            margin: 30px 0;
        }
        .section-wapper{
            width: 768px;
            margin:auto;
        }
        .content{
            padding-bottom: 30px;
            h1,h2,h3,h4,h5,h6{
                margin:1.5em 0;
            }
            h1{
                font-size:2.4em;
            }
            h2{
                font-size:2.15em;
            }
            h3{
                font-size:1.7em;
            }
            h4{
                font-size:1.25em;
            }
            h5{
                font-size:1em;
            }
            h6{
                font-size:.85em;
            }
            p, pre, blockquote {
                margin: 0 0 1.1em;
            }
            hr{
                margin:30px 0;
            }
            blockquote{
                border-left: 10px solid #aaa;
                padding: 10px 20px;
                background-color: rgba(128,128,128,0.2);
                p:last-child{
                    margin-bottom: 0;
                }
            }
            pre{
                background-color: rgba(128,128,128,0.2);
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                padding: 15px 20px;
                code {
                    font-size: 14px;
                    span{
                        font-size: 14px;
                    }
                }
            }
        }
    } 
</style>