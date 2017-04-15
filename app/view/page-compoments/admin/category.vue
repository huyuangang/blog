<template>
    <div class='category'>
		<el-row>
            <el-col>
                <el-table :data='categories' highlight-current-row>
                    <el-table-column type="index" width="50" align="center"></el-table-column>
                    <el-table-column property="name" label="名称" align="center" width="400"></el-table-column>
                    <el-table-column  label="日期" width="300" align="center">
                        <template scope="scope">
                            {{getDate(scope.row.createTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="文章数量" align="center" width="150">
                        <template scope="scope">
                            {{scope.row.articles.length}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template scope="scope">
                            <i class="icon-pencil" title='编辑'></i>
                            <i class="icon-bin" title='删除' @click='deleteCategory(scope.row._id)'></i>
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
                categories:[]
            }
        },
        created:function(){
            this.getCategory();
        },
        methods:{
            getDate:function(date){
                return hl.date.format(date,'yyyy-MM-dd hh:mm:ss');
            },
            deleteCategory:function(id){
                hl.ajax.del('/admin/category/'+id,
                    (json)=>{
                        console.log(json);
                        this.getCategory();
                    },
                    (str)=>{
                        console.log(str);
                    }
                )
            },
            getCategory:function(){
                hl.ajax.get('/admin/category/data',{},
                    (json)=>{
                        if(json.success)
                            this.categories = json.data;
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
    .category{
        margin-top:80px;
        i{
            cursor:pointer;
            margin: 0 4px;
        };
        i:hover{
            color:#49ac43;
        }
    }
</style>