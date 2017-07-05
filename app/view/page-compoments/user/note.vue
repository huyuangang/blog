<template>
    <div class='detail'>
        <header class="header">
            <h1>{{title||'无标题'}} <span><format-date :date='createTime' format='yyyy-MM-dd'></format-date></span></h1>
            <p>{{description||'暂时没有任何描述...'}}</p>
        </header>
        <div class="section-wapper">
            <div class="content" v-html='content'></div>
        </div>
    </div>
</template>


<script>
    import {getNoteById} from '../../../public/js/api.js';
    import formatDate from '@components/format-date.vue';
    export default{
        components:{formatDate},
        data:function(){
            return{
                title:'',
                description:'',
                content:'',
                createTime:''
            }
        },
        activated:function(){
            let id = this.$route.params.id;
            getNoteById(id)
                .then((res) => {
                    let data = res.data.data;
                    this.title = data.title;
                    this.description = data.description;
                    this.content = data.html;
                    this.createTime = data.createTime;
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }
</script>

<style lang="less">
    @media screen and(min-width: 640px){
        .detail{
            width:960px;
            margin: auto;
            .header{
                margin-top:40px;
            }
        }
    }
    @media screen and(max-width: 640px){
        .detail{
            padding: 10px;
            .header{
                margin-top:20px;
            }
        }
    }
    .detail{
        .header{
            margin-bottom:20px;
            border-bottom:2px solid #aaa;
            h1{
                font-size:24px;
                span{
                    font-size: 16px;
                    color:#666;
                }
            }
        }
        p{
            margin: 30px 0;
        }
        .content{
            padding-bottom: 30px;
            h1,h2,h3,h4,h5,h6{
                margin:1.5em 0;
            }
            h1{
                font-size:24px;
            }
            h2{
                font-size:22px;
            }
            h3{
                font-size:20px;
            }
            h4{
                font-size:16px;
            }
            h5{
                font-size:14px;
            }
            h6{
                font-size:12px;
            }
            p, pre, blockquote {
                margin: 0 0 1.1em;
            }
            hr{
                margin:30px 0;
            }
            blockquote{
                border-left: 10px solid #aaa;
                padding: 10px 20px;
                background-color: #f4f7f8;
                p:last-child{
                    margin-bottom: 0;
                }
            }
            pre{
                background-color: #fff;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                padding: 15px 20px;
                overflow: auto;
                code {
                    font-size: 14px;
                    span{
                        font-size: 14px;
                    }
                }
            }
            a{
                color:#217ac0;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    } 
</style>