<template>
    <div class='article'>
		<el-row>
            <el-col>
                <el-table :data='articles' highlight-current-row>
                    <el-table-column type="index"  align="center" ></el-table-column>
                    <el-table-column property="title" label="标题" align="center" width = '300'></el-table-column>
                    <el-table-column  label="日期"  align="center" width = '300'>
                        <template scope="scope">
                            {{getDate(scope.row.createTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column property="status" label="状态" width='90' align="center" >
                        <template scope="scope">
                            {{scope.row.status?"显示":"隐藏"}}
                        </template>
                    </el-table-column>
                    <el-table-column property="pv" label="阅读" align="center" width='70'></el-table-column>
                    <el-table-column property="review" label="评论"  align="center" width='70'></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template scope="scope">
                            <a :href='"/article/details/"+scope.row._id'><i class="icon-eye" title='查看'></i></a>
                            <a :href='"/admin/article/edit/"+scope.row._id'><i class="icon-pencil" title='编辑'></i></a>
                            <a @click='changeStatus(scope.row._id)'><i class="icon-cog" title='切换状态'></i></a>
                            <a @click='deleteArticle(scope.row._id)'><i class="icon-bin" title='删除' ></i></a>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>				
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
                hl.ajax.get('/admin/article/all',{},
                (json)=>{
                    if(json.success)
                        this.articles = json.data;
                },
                (str)=>{
                    console.log(str);
                })
            },
            changeStatus:function(id){
                hl.ajax.put('/admin/article/status/'+id,{},
                    (json)=>{
                        console.log(json);
                        this.getArticle();
                    },
                    (str)=>{
                        console.log(str);
                    }
                )
            }
        }
    }
</script>


<style lang="less" scoped>
.article{
    margin-top:50px;
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