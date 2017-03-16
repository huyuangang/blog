<template>
    <div>
        <header class='header'>
            <div class="cont">
                <img class='profile-image' src='/images/profile.jpg'></img>
                <div class="profile-content">
                    <h1>{{user.name}}</h1>
                    <h1>{{user.description}}</h1>
                    <ul class="social-icon"></ul>
                </div>
                <a href="#" class="btn-contact">
                    <i class="icon-quill"></i>&nbsp;我的简历
                </a>
            </div>
        </header>
        <div class="section-wapper">
            <div class="row">
                <div class="left-box">
                    <div class="section-inner">
                        <h2>文章</h2>
                    </div>
                </div>
                <div class="right-box">
                    <div class="section-inner">
                        <ul class="info">
                            <li>{{user.address}}</li>
                            <li>{{user.email}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default{
        data:function(){
            return{
                user:null
            }
        },
        created:function(){
            hl.ajax.get('/user/info',{},
            (json)=>{
                this.user.name = json.data.
            },
            (str)=>{
                console.log(str);
            })
        }
    }
</script>

<style lang='less' scoped>
    @import '../../../styles/user/index.less';
    a{
        text-decoration:none;
    }
</style>