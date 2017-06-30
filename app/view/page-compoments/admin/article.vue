<template>
    <div class='article'>
        <div class="list-header">
            <span class='no'>#</span>
            <span class='title'>标题</span>
            <span class='time'>发表日期</span>
            <span class='status'>状态</span>
            <span class='pv'>阅读量</span>
            <span class='review'>评论量</span>
            <span class='op'>操作</span>
        </div>
        <div class='list-item' v-for='(a,index) in articles'>
            <span class='no'>{{index}}</span>
            <span class='title'>{{a.title}}</span>
            <span class='time'><format-date :date='a.createTime' format='yyyy-MM-dd hh:mm:ss'></format-date></span>
            <span class='status'>{{a.status?"显示":"隐藏"}}</span>
            <span class='pv'>{{a.pv}}</span>
            <span class='review'>{{a.review}}</span>
            <span class='op'>
                <a :href='"/note/"+a._id'><i class="icon-eye" title='查看'></i></a>
                <a href='#'><i class="icon-pencil" title='编辑'></i></a>
                <a @click='changeStatus(a._id)'><i class="icon-cog" title='切换状态'></i></a>
                <a @click='deleteNote(a._id)'><i class="icon-bin" title='删除' ></i></a>
            </span>
        </div>
    </div>
</template>

<script>
    import {deleteNoteById, getNotes, changeNoteStatusById} from '../../../public/js/api.js';
    import formatDate from '@components/format-date.vue';
    export default{
        data:function(){
            return {
                articles:[]
            }
        },
        components:{formatDate},
        activated:function(){
            this.getNotes();
        },
        methods:{
            deleteNote:function(id){
                deleteNoteById(id)
                    .then((res)=>{
                        this.getNotes();
                    })
                    .catch((e)=>{
                        console.log(e);
                    });
            },
            getNotes:function(){
                getNotes()
                    .then((res)=>{
                        if(res.data.success)
                            this.articles = res.data.data;
                    })
                    .catch((e)=>{
                        console.log(e);
                    });
            },
            changeStatus:function(id){
                changeNoteStatusById(id)
                    .then((res)=>{
                        this.getNotes();
                    })
                    .catch((e)=>{
                        console.log(e);
                    });
            }
        }
    }
</script>


<style lang="less" scoped>
.article{
    .list-header,.list-item{
        padding-bottom: 20px;
        border-bottom: 1px solid #e7e7e7;
        font-weight: bold;
        span{
            display:inline-block;
        }
        .no{
            width:50px;
            text-align: center;
        }
        .title{
            width: 300px;
        }
        .time{
            width: 270px;
        }
        .status{
            width: 100px;
            text-align:center;
        }
        .pv,.review{
            width:90px;
            text-align:center;
        }
    }
    .list-item{
        font-weight: normal;
        padding: 20px 0;
        border-bottom: none;
    }
}
a{
    cursor:pointer;
    margin: 0 4px;
    color:#434343;
}
a:hover{
    color:#49ac43;
}
</style>