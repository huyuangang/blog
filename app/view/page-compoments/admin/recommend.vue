<template>
    <div class='recommend'>
		<el-row>
            <el-col>
                <el-table :data='recommends' highlight-current-row>
                    <el-table-column type="index"  align="center" ></el-table-column>
                    <el-table-column property="name" label="名称" align="center" width = '350'></el-table-column>
                    <el-table-column  label="链接地址"  align="center" width = '500'>
                        <template scope="scope">
                            <a target='_blank' :href="scope.row.url">{{scope.row.url}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" >
                        <template scope="scope">
                            <i title='编辑' class="icon-pencil"></i>
                            <i title='删除' @click='deleteRcommend(scope.row._id)' class="icon-bin"></i>
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
            return{
                recommends:[]
            }
        },
        created:function(){
            hl.ajax.get('/admin/recommend/data',{},
                (json)=>{
                    if(json.success)
                        this.recommends = json.data;
                },
                (str)=>{
                    console.log(str);
                }
            )
        },
        methods:{
            deleteRcommend:function(id){
                console.log(id);
            }
        }
    }
</script>


<style lang="less" scoped>
i{
    cursor:pointer;
    margin: 0 4px;
};
i:hover{
    color:#49ac43;
}
</style>