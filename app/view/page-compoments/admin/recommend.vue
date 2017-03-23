<template>
    <div class='recommend'>
        <table cellspacing='0' class="recommend-table table">
            <thead>
                <tr>
                    <th>名称</th>
                    <th>链接地址</th>
                    <th>操作</th>
                </tr>
            </thead>		
			<tbody>
                <tr v-for='r in recommends'>
                    <td>{{r.name}}</td>
                    <td>
                        <a target='_blank' :href="r.url">{{r.url}}</a>
                    </td>
                    <td>
                        <i title='编辑' class="icon-pencil"></i>
                        <i title='删除' @click='deleteRcommend(r._id)' class="icon-bin"></i>
                    </td>
                </tr>
            </tbody>
        </table>
						
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
    .recommend{
        margin-top:80px;
        .recommend-table{
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