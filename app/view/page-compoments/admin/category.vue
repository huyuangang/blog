<template>
    <div class='category'>
        <span class='add-btn' @click='showModal=true;'>添加分类</span>
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
        <modal title='添加分类' v-show='showModal' @close='showModal=false;cateName=""'>
            <div class='add-form' slot='body'>
                <input type="text" placeholder='请输入分类名称' v-model='cateName'>
            </div>
            <div class='add-footer' slot='footer'>
                <span class='cancel' @click='showModal=false;cateName=""'>取消</span>
                <span class='sumbit' @click='addCate'>确认添加</span>
            </div>
        </modal>
    </div>
</template>

<script>
    import {getCates, deleteCateById, addCate} from '../../../public/js/api.js';
    import formatDate from '@components/format-date.vue';
    import modal from '@components/modal.vue';
    export default{
        data:function(){
            return {
                categories:[],
                cateName: '',
                showModal: false
            }
        },
        components:{formatDate, modal},
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
            },
            addCate () {
                addCate({
                    name: this.cateName
                })
                .then((res)=>{
                    if(res.data.success){
                        this.showModal = false;
                        this.getCategory();
                    }
                }).catch((e) => {
                    console.log(e);
                })
            }
        }
    }
</script>


<style lang="less" scoped>
    .category{
        .add-btn{
            display:inline-block;
            margin-bottom: 20px;
            margin-left: 20px;
            height: 50px;
            text-align:center;
            line-height: 50px;
            border: 1px solid;
            padding: 0  20px;
            cursor: pointer;
        }
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
        .add-form{
            padding: 0 20px;
            input{
                display: block;
                margin: 20px 0;
                width: 100%;
                padding: 10px 0;
            }
        }
        .add-footer{
            overflow:auto;
            span{
                float: right;
                width: 80px;
                text-align: center;
                box-sizing: border-box;
                margin-bottom: 10px;
                cursor: pointer;
                padding: 8px 0;
            }
            .sumbit{
                background: #20a0ff;
                border: 1px solid #20a0ff;
                color: #fff;
                margin-right: 15px;
                &:hover{
                    background-color: #4db3ff;
                }
            }
            .cancel{
                border: 1px solid #bfcbd9;
                color:#1f2d3d;
                margin-right: 30px;
                &:hover{
                    border: 1px solid #20a0ff;
                    color:#20a0ff; 
                }
            }
        }
    }
</style>