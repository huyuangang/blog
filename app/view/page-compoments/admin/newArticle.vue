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
                        <input type='checkbox' name='type' :value='c._id' v-model='cates'>
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
    import {getCates, publishNote} from '../../../public/js/api.js';
    import marked from '../../../public/js/markdown.js';
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
        computed:{
            markText:function(){
                return marked(this.content);
            }
        },
        activated:function(){
            getCates()
                .then((res)=>{
                    this.categories = res.data.data;
                })
                .catch((e) => {
                    console.log(e);
                })

        },
        deactivated () {
            this.title = '';
            this.description = '';
            this.newCate = '';
            this.cates = [];
            this.content = '';
            this.categories = [];
        },
        methods: {
            sumbit () {
                publishNote({
                    title:this.title,
                    description:this.description,
                    category:this.cates,
                    text:this.content,
                    html:this.markText,
                    newCate:this.newCate
                }).then((res) => {
                    this.$router.push('/admin/article');
                }).catch((e) => {
                    console.log(e);
                })
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
        border: 1px solid #ddd;
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
