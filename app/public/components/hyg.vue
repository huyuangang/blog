<template>
    <div>
        <input type="text" v-model='msg' @keydown.enter='sendData'>
    </div>
</template>
<script>
    export default{
        data () {
            return {
                count: 0,
                msg:''
            }
        },
        methods: {
            sendData () {
                this.$emit('child-event',this.msg);
            }
        },
        mounted () {
            this.$parent.$on('parent-event',(data)=>{
                console.log(data);
            })
        }
    }
</script>