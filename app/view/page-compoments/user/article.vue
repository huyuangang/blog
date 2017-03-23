<template>
    <div class='detail'>
        <nav class='nav'><a href="/">主页</a>&nbsp;&gt;&nbsp;文章详情页</nav>
        <div class="section-wapper">
            <h1>{{title}}</h1>
            <p>{{description}}</p>
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
                content:''
            }
        },
        created:function(){
            var id = this.$route.params.id;
            hl.ajax.get('/article/details/'+id+'/data',{},
                (json)=>{
                    if(json.success){
                        var data = json.data;
                        this.title = data.title;
                        this.description = data.description;
                        this.content = data.content;
                    }
                }
            )
        }
    }
</script>

<style lang="" scoped>
    .detail{
        border-top:10px solid #778492;
        padding:10px  15% 60px;
        background: #dae3e7;
    }
    .nav{
        padding:0 10px 8px 0;
        border-bottom:1px solid #aaa;
    }
    .section-wapper{
        width:100%;
        background:#fff;
        padding:20px;
        margin-top:50px;
    }
    .section-wapper h1{
        font-size:30px;
    }
    .section-wapper p{
        text-indent:20px;
        color:#555;
    }
</style>