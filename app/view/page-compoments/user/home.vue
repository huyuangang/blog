<template>
    <div class='home'>
        <h3>日志</h3>
        <ul>
            <li v-for='l in logs'>{{l.content}}</li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'
    import {getLogs} from '../../../public/js/api.js';
    export default{
        data() {
            return {
                logs: []
            }
        },
        activated () {
            this.getLogs();
        },
        methods: {
            getLogs () {
                getLogs()
                    .then((res) => {
                        this.logs = res.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            }
        }
    }
</script>

<style lang='less' scoped>
    .home{
        h3{
            margin: 30px 0;
        }
    }
</style>