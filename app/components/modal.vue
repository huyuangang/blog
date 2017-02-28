<!-- 模态框组件 -->
<template>
   <div class="modal">
        <div class="modal-dialog"  style="height:auto">
            <div class="modal-header" :style="{background:headerColor}"  v-on:mousedown='down($event)'>
                <span>{{title}}</span>
                <a>×</a>
            </div>
            <slot name='modal-body'>
                <div class="modal-body">
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:['config'],
        data: function() {
            return {
                startPoint: {
                    x: 0,
                    y: 0
                },
                start: {
                    x: 0,
                    y: 0
                },
                wndRect:{
                    w:0,
                    h:0
                },
                modalRect:{
                    w:0,
                    h:0,
                    l:0,
                    t:0
                },
                title: 'Modal',
                width: 600,
                top:0,
                headerColor: '#333',
            }
        },
        methods: {
            closeModal:function(){
                this.$emit("close-modal");
            },
            calcModal:function(){
                var dom = this.$el.querySelector('.modal-dialog');
                var m_Style = null;
                if(window.getComputedStyle){
                    m_Style = window.getComputedStyle(dom,null);
                }else{
                    m_Style = dom.currentStyle;
                }
                this.modalRect.w = this.width || parseInt(m_Style.width);
                this.modalRect.h = parseInt(m_Style.height);
                this.modalRect.l = parseInt(m_Style.marginLeft);
                this.modalRect.t = this.top||parseInt(m_Style.marginTop);
            },
            down: function(event){
                if(event.target.tagName === 'A'){
                   this.closeModal();
                }else{
                    this.calcModal();
                    this.start.x = event.clientX;
                    this.start.y = event.clientY;
                    var me = this;
                    document.addEventListener('mousemove',move);
                    document.addEventListener('mouseup',up);
                    function move(event){
                        me.startPoint.x += event.clientX - me.start.x;
                        me.startPoint.y += event.clientY - me.start.y;
                        me.start.x = event.clientX;
                        me.start.y = event.clientY;
                        if(me.startPoint.x + me.modalRect.l <= 0){
                            me.startPoint.x = 0 - me.modalRect.l;
                        }
                        if(me.startPoint.x + me.modalRect.l + me.modalRect.w >= me.wndRect.w){
                            me.startPoint.x = me.wndRect.w - me.modalRect.l - me.modalRect.w;
                        }
                        if(me.startPoint.y + me.modalRect.t <= 0){
                            me.startPoint.y = 0-me.modalRect.t;
                        }
                        if(me.startPoint.y + me.modalRect.t + me.modalRect.h >= me.wndRect.h){
                            me.startPoint.y = me.wndRect.h - me.modalRect.t - me.modalRect.h;
                        }
                        document.querySelector('.modal-dialog').style.transform = 'translate('+me.startPoint.x+'px,'+me.startPoint.y+'px)';
                    }
                    function up(){
                        document.removeEventListener('mousemove',move);
                        document.removeEventListener('mouseup',up);
                    }
                } 
            }
        },
        created: function(){
            var me = this;
            if(me.config){
                var config = me.config;
                me.title = config.title || 'Modal';
                me.headerColor = config.headerColor ||  '#3c4651';
                me.width = config.width || 600;
                me.top = config.top || 0;
            }
            this.wndRect.w = document.documentElement.clientWidth;
            this.wndRect.h = document.documentElement.clientHeight;
        },
        mounted:function(){
            var me = this;
            var dom = this.$el.querySelector('.modal-dialog');
            dom.style.cssText = 'margin-top:'+this.top + 'px;width:'+this.width+'px';
        }
    }
</script>

<style>
        
    .modal{
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(137,137,137,0.5) ;
        width: 100%;
        height: 100%;
        z-index: 10000;
        -moz-user-select: none;
        user-select: none;
    }
    .modal-dialog{
        z-index: 101;
        margin: auto;
        background: #fff;
        box-shadow: 0 0 5px black;
        position: relative;
    }
    .modal-header{
        display: inline-block;
        width: 100%;
        cursor: move;
    }
    .modal-header span{
        color: white;
        float: left;
        margin-left: 10px;
        user-select: none;
        z-index: 50;
        line-height: 35px;
    }
    .modal-header a{
        font-size: 1.4em;
        color: black;
        float: right;
        margin-right: 10px;
        color: #999;
        cursor: pointer;
        text-decoration: none;
        line-height: 35px;
    }
    .modal-header a:hover{
        color: white;
    }
    .modal-body{
        width: 100%;
    }
</style>