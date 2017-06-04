<template>
    <div class='logs'>
        <span class='add-btn' @click='showModal=true;'>添加</span>
        <div class="list-header">
            <span class='no'>#</span>
            <span class='title'>日志</span>
            <span class='op'>操作</span>
        </div>
        <div class='list-item' v-for='(l ,index) in logs'>
            <span class='no'>{{index + 1}}</span>
            <span class='title'>{{l.content}}</span>
            <span class='op'>
                <a href='#'><i class="icon-pencil" title='编辑'></i></a>
                <a @click='deleteLog(l._id)'><i class="icon-bin" title='删除' ></i></a>
            </span>
        </div>
        <modal title='添加日志' v-show='showModal' @close='showModal=false;addContent=""'>
            <div class='add-form' slot='body'>
                <input type="text" placeholder='请输入日志内容' v-model='addContent'>
            </div>
            <div class='add-footer' slot='footer'>
                <span class='cancel' @click='showModal=false;addContent=""'>取消</span>
                <span class='sumbit' @click='addLog'>确认添加</span>
            </div>
        </modal>
    </div>
</template>

<script>
    import {getLogs, addLog, deleteLogById} from '../../../public/js/api.js';
    import modal from '@components/modal.vue';
    export default {
        components: {modal},
        data() {
            return {
                logs: [],
                addContent: '',
                showModal: false
            }
        },
        activated () {
            this.getLogs();
        },
        methods: {
            getLogs () {
                getLogs()
                    .then((res) => {
                        this.logs = res.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            },
            deleteLog (id) {
                deleteLogById(id)
                    .then((res) => {
                        console.log(res.data);
                        this.getLogs();
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            },
            addLog () {
                addLog({
                    content: this.addContent
                })
                .then((res)=>{
                    if(res.data.success){
                        this.showModal = false;
                        this.getLogs();
                    }
                }).catch((e) => {
                    console.log(e);
                })
            }
        }
    }
</script>

<style lang='less' scoped>
    .add-btn{
        display:inline-block;
        margin-bottom: 20px;
        margin-left: 20px;
        height: 40px;
        text-align:center;
        line-height: 40px;
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
            width: 800px;
        }
        .op{
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
</style>
