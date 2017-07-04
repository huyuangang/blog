<!-- 模态框组件 -->
<template>
   <div class="modal-background">
		<div class="modal-dialog">
			<div class="modal-header">
				<a id='close' href="javascript:void(0)" @click='close'>关闭</a>
				<h3>{{title}}</h3>
			</div>
			<div class="modal-body">
				<slot name='body'></slot>
			</div>
			<div class="modal-footer">
				<slot name='footer'>这里是注脚</slot>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        props:{
            title:{
                type: String,
                default: '模态框'
            }
        },
        methods: {
            close () {
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>
    .modal-background{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(128,128,128,.6);
        z-index:100;
        font-size: 14px;
        display: block;
    }
    .modal-dialog{
        position: relative;
        width: 500px;
        margin: auto;
        background: #fff;
        box-shadow: 0 0 5px #333;
        top: 50%;
        transform: translate(0,-50%);
    }
    .modal-header{
        line-height: 40px;
        overflow: auto;
        padding: 0 10px;
    }
    .modal-header h1{
        float: left
    }
    .modal-header a{
        float: right;
        text-decoration: none;
        color: #aaa;
    }
    .modal-header a:hover{
        color: #000;
    }
    .modal-body{
        padding: 10px;
    }
    .modal-footer{
        padding-left: 10px;
    }
</style>