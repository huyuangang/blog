<template>
    <div class='category'>
        <table cellspacing='0' class="category-table table">
            <thead>
                <tr>
                    <th>名称</th>
                    <th>新建时间</th>
                    <th>文章数量</th>
                    <th>操作</th>
                </tr>
            </thead>		
			<tbody>
                <tr v-for='c in categories'>
                    <td>{{c.name}}</td>
                    <td>{{getDate(c.createTime)}}</td>
                    <td>{{c.articles.length}}</td>
                    <td>
                        <i class="icon-pencil" title='编辑'></i>
                        <i class="icon-bin" title='删除' @click='deleteCategory(c._id)'></i>
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
        .category-table{
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
        }
    }
</style>