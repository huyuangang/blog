<template>
    <div class='new-article'>
        <form action="" class="article-form">
            <div class="form-group">
                <label for="">文章标题</label>
                <input type="text" v-model='title'>
            </div>
			<div class="form-group">
                <label for="">文章描述</label>
                <input type="text" v-model='description'>
            </div>	
            <div class="form-group">
                <label for="">文章类别</label>
                <input type="text" v-model='newCate'>
                <div class="type">
                    <div v-for='c in categories'>
                        <input type='checkbox' name='type' :value='c.name' v-model='cates'>
                        <span>{{c.name}}</span> 
                    </div>
                        
                </div>
                    
            </div>
        </form>
        <h2>文章内容</h2>
		<div class="editor">
            <div class="article-edit">
                <textarea name="" id="" cols="30" rows="10" v-model='content'></textarea>
            </div>
			<div class="article-show" v-html='markText'>
            </div>
        </div>
					
        <button class="sumbit" @click='sumbit'>发表文章</button>
        <button class="cancel">取消</button>
    </div>
</template>


<script>
    var marked = require('marked');
    var hls = require('highlight.js');
    hls.configure({
        tabReplace:'    '
    })
    var renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        highlight:function(code){
            return hls.highlightAuto(code).value;
        }
    })
    export default{
        data:function(){
            return{
                title:'',
                description:'',
                newCate:'',
                cates:[],
                content:'',
                categories:[]
            }
        },
        methods:{
            sumbit:()=>{
                console.log('sumbit');
            }
        },
        computed:{
            markText:function(){
                return marked(this.content);
            }
        },
        created:function(){
            var me = this;
            function cateSuccess(json){
                me.categories = json.data;
            }
            hl.ajax.get('/admin/category/data',{},cateSuccess,(str)=>{console.log(str)});
            // var id = this.$route.params.id;
            // if(!id)
            //     return;
            // hl.ajax.get('/admin/article/'+id,{},
            //     (json)=>{
            //         if(json.success){
            //             var data = json.data;
            //             this.title = data.title;
            //             this.description = data.description;
            //             this.cates = data.category;
            //             this.content = data.text;
            //         }
            //     }
            // )

        },
        methods:{
            sumbit:function(){
                var id = this.$route.params.id;
                var me = this;
                function s(str){
                    console.log(str);
                }
                if(me.newCate !== '')
                    me.cates.push(me.newCate);
                hl.ajax.post('/admin/article/new',{
                    title:me.title,
                    description:me.description,
                    category:me.cates,
                    text:me.content,
                    html:me.markText,
                    newCate:me.newCate
                },s,s)
            }
        }
    }
</script>


<style lang="" scoped>
    .new-article{
        width:1140px;
        margin:auto;
        padding-bottom:30px;
    }
    .form-group{
        margin-top: 20px;
    }
    .form-group label{
        color: #555;
        display: block;
        margin-bottom: 5px;
        padding-left: 10px;
        border-left: 5px solid #49ac43;
        margin-left: 5px;
    }
    .form-group > input{
        width: 100%;
        display: block;
        height: 35px;
        text-indent: 10px;
        border-radius: 3px;
        border:1px solid #ddd;
    }
    .form-group .type{
        margin-top: 10px;
    }
    .form-group .type div{
        display: inline-block;
    }
    .form-group .type span{
        margin-right: 10px;
        font-size: 14px;
        color: #555;
        margin-left: 5px;
    }
    .editor{
        margin-top: 30px;
        overflow:hidden;
    }
    .editor h2{
        margin-bottom: 10px;
        padding-left: 10px;
    }
    .editor .article-edit{
        float:left;
        width:50%
    }
    .editor textarea{
        height: 470px;
        overflow: auto;
        width: 100%;
        resize: none;
        outline: none;
        border:none;
        border-right: 1px solid #ddd;
        padding:10px;
        box-sizing: border-box;
    }
    .editor .article-show{
        height: 450px;
        padding:10px 0;
        overflow:auto;
        background: #fff;
        float:left;
        width:50%;
    }
    button{
        width: 100px;
        line-height: 30px;
        margin-top: 20px;
        margin-right: 20px;
        cursor: pointer;
    }
    .sumbit{
        background: #49ac43;
        color: #fff;
        border:1px solid #49ac43;
    }
    .sumbit:hover{
        background: #41963c; 
    }
    .cancel{
        background: #ccc;
        border:1px solid #ccc;
    }
    .cancel:hover{
        background: #bbb;
    }
</style>
