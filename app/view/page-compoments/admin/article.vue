<template>
    <div class='article'>
        <table cellspacing='0' class="article-table table">
            <thead>
                <tr>
                    <th class="text-left">标题</th>
                    <th>发表时间</th>
                    <th>状态</th>
                    <th>阅读</th>
                    <th>评论</th>
                    <th>操作</th>
                </tr>
            </thead>		
			<tbody>
                <tr v-for='a in articles'>
                    <td>{{a.title}}</td>
                    <td>{{getDate(a.createTime)}}</td>
                    <td>{{a.status?"显示":"隐藏"}}</td>
                    <td>{{a.pv}}</td>
                    <td>{{a.review}}</td>
                    <td>
                        <i class="icon-eye" title='查看'></i>
                        <i class="icon-pencil" title='编辑'></i>
                        <i class="icon-cog" title='切换状态'></i>
                        <i class="icon-bin" title='删除' @click='deleteArticle(a._id)'></i>
                    </td>
                </tr>
            </tbody>
        </table>
						
    </div>
</template>

<script>
    export default{
        data:function(){
            return {
                articles:[]
            }
        },
        created:function(){
            this.getArticle();
        },
        methods:{
            getDate:function(date){
                return hl.date.format(date,'yyyy-MM-dd hh:mm:ss');
            },
            deleteArticle:function(id){
                hl.ajax.del('/admin/article/'+id,
                    (json)=>{
                        console.log(json);
                        this.getArticle();
                    },
                    (str)=>{
                        console.log(str);
                    }
                )
            },
            getArticle:function(){
                hl.ajax.get('/admin/article/data',{},
                (json)=>{
                    if(json.success)
                        this.articles = json.data;
                },
                (str)=>{
                    console.log(str);
                })
            }
        }
    }
</script>


<style lang="less" scoped>
    .article{
        margin-top:80px;
        .article-table{
            width:100%;
            thead{
                th{
                    border-bottom:5px solid;
                    padding:0 0 10px 0;
                }
                
            };
            tbody{
                td{
                    text-align:center;
                    line-height:50px;
                    border-bottom:1px solid #fff;
                    i{
                        cursor:pointer;
                        margin: 0 4px;
                    };
                    i:hover{
                        color:#49ac43;
                    }
                }
            }
        };
    }
</style>