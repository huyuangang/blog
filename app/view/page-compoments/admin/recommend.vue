<template>
    <div class='recommend'>
        <a class='add-recommend' @click='toShowModal'>添加推荐</a>
        <div class="list-header">
            <span class='no'>#</span>
            <span class='title'>名称</span>
            <span class='time'>添加日期</span>
            <span class='url'>链接地址</span>
            <span class='op'>操作</span>
        </div>
        <div class='list-item' v-for='(r ,index) in recommends'>
            <span class='no'>{{index}}</span>
            <span class='title'>{{r.name}}</span>
            <span class='time'><format-date :date='r.createTime' format='yyyy-MM-dd hh:mm:ss'></format-date></span>
            <span class='url'>{{r.url}}</span>
            <span class='op'>
                <a href='#'><i class="icon-pencil" title='编辑'></i></a>
                <a @click='deleteRcommend(r._id)'><i class="icon-bin" title='删除' ></i></a>
            </span>
        </div>
        <modal title='添加推荐' v-show='showModal' @close='closeModal'>
            <div class='add-form' slot='body'>
                <input type="text" placeholder='请输入推荐名称' v-model='addName'>
                <input type="text" placeholder='请输入推荐地址' v-model='addUrl'>
            </div>
            <div class='add-footer' slot='footer'>
                <span class='cancel' @click='closeModal'>取消</span>
                <span class='sumbit' @click='addRecommend'>确认添加</span>
            </div>
        </modal>
    </div>
</template>

<script>
    import {getRecommends, addRecommend, deleteRecommendById} from '../../../public/js/api.js';
    import formatDate from '@components/format-date.vue';
    import modal from '@components/modal.vue';
    export default{
        data:function(){
            return{
                recommends:[],
                showModal: false,
                addName: '',
                addUrl: ''
            }
        },
        components:{
            formatDate, modal
        },
        activated:function(){
            this.getRecommend();
        },
        methods:{
            getRecommend () {
                getRecommends()
                    .then((res)=>{
                        if(res.data.success)
                            this.recommends = res.data.data;
                    })
                    .catch((e)=>{
                        console.log(e);
                    });
            },
            deleteRcommend (id) {
                deleteRecommendById(id)
                    .then((res)=>{
                        if(res.data.code === 1)
                            this.getRecommend();
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            },
            toShowModal () {
                this.showModal = true;
            },
            closeModal () {
                this.showModal = false;
            },
            addRecommend () {
                addRecommend({
                        name: this.addName,
                        url: this.addUrl
                }).then((res)=>{
                    console.log(res.data);
                    if(res.data.success){
                        this.showModal = false;
                        this.getRecommend();
                    }
                }).catch((e) => {
                    console.log(e);
                })
            }
        }
    }
</script>


<style lang="less" scoped>
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
            width: 200px;
        }
        .url{
            width: 350px;
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
    .add-recommend{
        display:inline-block;
        margin-bottom: 20px;
        margin-left: 20px;
        height: 50px;
        text-align:center;
        line-height: 50px;
        border: 1px solid;
        padding: 0  10px;
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
                background: #4db3ff;
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
</style>