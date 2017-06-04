<template>
    <div class='category'>
        <div class="list-header">
            <span class='no'>#</span>
            <span class='title'>名称</span>
            <span class='time'>新建日期</span>
            <span class='quantity'>文章数量</span>
            <span class='op'>操作</span>
        </div>
        <div class='list-item' v-for='(c ,index) in categories'>
            <span class='no'>{{index}}</span>
            <span class='title'>{{c.name}}</span>
            <span class='time'><format-date :date='c.createTime' format='yyyy-MM-dd hh:mm:ss'></format-date></span>
            <span class='quantity'>{{c.articles.length}}</span>
            <span class='op'>
                <a href='#'><i class="icon-pencil" title='编辑'></i></a>
                <a @click='deleteCategory(c._id)'><i class="icon-bin" title='删除' ></i></a>
            </span>
        </div>
    </div>
</template>

<script>
    import {getCates, deleteCateById} from '../../../public/js/api.js';
    import formatDate from '@components/format-date.vue';
    export default{
        data:function(){
            return {
                categories:[]
            }
        },
        components:{formatDate},
        activated:function(){
            this.getCategory();
        },
        methods:{
            deleteCategory:function(id){
                deleteCateById(id)
                    .then((res)=>{
                        this.getCategory();
                    })
                    .catch((e)=>{
                        console.log(e);
                    });
            },
            getCategory:function(){
                getCates()
                    .then((res)=>{
                        if(res.data.success)
                            this.categories = res.data.data;
                    })
                    .catch((e)=>{
                        console.log(e);
                    });
            }
        }
    }
</script>


<style lang="less" scoped>
    .category{
        margin-top:80px;
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
            .quantity{
                width: 100px;
                text-align:center;
            }
            .op{
                width:200px;
                text-align: center;
            }
        }
        .list-item{
            font-weight: normal;
            padding: 20px 0;
            border-bottom: none;
        }
        i{
            cursor:pointer;
            margin: 0 4px;
        };
        i:hover{
            color:#49ac43;
        }
    }
</style>