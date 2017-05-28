<template>
    <div class='reco'>
        <div class='reco-item' v-for='r in recommends'>
            <span class='tag icon-triangle-right'></span><a :href="r.url" target='_blank'>{{r.name}}</a>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                recommends: []
            }
        },
        activated () {
            axios.get('/api/recommends')
                .then((res) => {
                    if(res.data.success)
                        this.recommends = res.data.data;
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }
</script>


<style lang='less' scoped>
    .reco {
        padding: 50px 150px 0;
        .reco-item{
            padding: 20px 0;
        }
        .tag{
            font-size: 14px;
            margin-right: 10px;
            display:inline-block;
        }
    }
</style>